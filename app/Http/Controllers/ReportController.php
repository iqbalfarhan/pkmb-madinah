<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Http\Requests\BulkUpdateReportRequest;
use App\Http\Requests\BulkDeleteReportRequest;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Report;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Report::query()->with(['academic_year', 'classroom', 'student'])->when($request->report_type, fn($q, $v) => $q->where('report_type', $v));

        return Inertia::render('report/index', [
            'reports' => $data->get(),
            'query' => $request->input(),
            'academicYears' => AcademicYear::get(),
            'classrooms' => Classroom::get(),
            'students' => Student::get(),
            'reportTypes' => Report::$reportTypes,
            'permissions' => [
                'canAdd' => $this->user->can('create report'),
                'canUpdate' => $this->user->can('update report'),
                'canDelete' => $this->user->can('delete report'),
                'canShow' => $this->user->can('show report'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
        $data = $request->validated();
        Report::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        return Inertia::render('report/show', [
            'report' => $report->load('student', 'classroom', 'academic_year')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        $data = $request->validated();
        $report->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        $report->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateReportRequest $request)
    {
        $data = $request->validated();
        Report::whereIn('id', $data['report_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteReportRequest $request)
    {
        $data = $request->validated();
        Report::whereIn('id', $data['report_ids'])->delete();
    }

    
}
