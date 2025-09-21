<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePpdbRequest;
use App\Http\Requests\UpdatePpdbRequest;
use App\Models\Classroom;
use App\Models\Family;
use App\Models\Grade;
use App\Models\Setting;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Student::query()
            ->with(['grade', 'prevschool'])
            ->whereIn('status', ['draft', 'ppdb'])
            ->when($request->status, function ($q, $v) {
                $q->where('status', $v);
            }, function ($q) {
                $q->where('status', 'ppdb');
            });

        return Inertia::render('ppdb/index', [
            'ppdbs' => $data->get(),
            'query' => $request->input(),
            'statusLists' => Student::$statusLists,
            'ppdbSetting' => Setting::where('key', 'PPDB_OPEN')->first(),
            'counts' => [
                'draft' => Student::draft()->count(),
                'ppdb' => Student::ppdb()->count(),
            ],
            'classrooms' => Classroom::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create ppdb'),
                'canUpdate' => $this->user->can('update ppdb'),
                'canDelete' => $this->user->can('delete ppdb'),
                'canShow' => $this->user->can('show ppdb'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create()
    {
        return Inertia::render('ppdb/create', [
            'grades' => Grade::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePpdbRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $student = Student::create($data);

        return redirect(route('ppdb.edit', $student->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $ppdb)
    {
        if ($ppdb->status === 'draft') {
            return redirect()->route('ppdb.edit', $ppdb);
        }

        return Inertia::render('ppdb/show', [
            'ppdb' => $ppdb->load(['grade', 'family', 'media', 'prevschool']),
            'permissions' => [
                'canApprove' => $this->user->can('update ppdb'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function edit(Request $request, Student $ppdb)
    {
        if ($ppdb->status !== 'draft') {
            return redirect()->route('ppdb.show', $ppdb);
        }

        return Inertia::render('ppdb/edit', [
            'grades' => Grade::get(),
            'student' => $ppdb,
            'family' => $ppdb->family,
            'media' => $ppdb->media,
            'prevschool' => $ppdb->prevschool,
            'salaryLists' => Family::$sallaryLists,
            'permissions' => [
                'canUpdate' => $ppdb->status == 'draft',
                'canDelete' => $ppdb->status == 'draft',
            ],
            'query' => $request->input(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePpdbRequest $request, Student $ppdb)
    {
        $data = $request->validated();
        $ppdb->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $ppdb)
    {
        $ppdb->delete();
    }

    public function download(Student $ppdb)
    {
        return Pdf::loadView('pdf.pendaftaran', [
            'ppdb' => $ppdb->load(['family', 'prevschool', 'media']),
        ])->stream();
    }
}
