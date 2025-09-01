<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Requests\BulkUpdateTeacherRequest;
use App\Http\Requests\BulkDeleteTeacherRequest;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Teacher::query()->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('teacher/index', [
            'teachers' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create teacher'),
                'canUpdate' => $this->user->can('update teacher'),
                'canDelete' => $this->user->can('delete teacher'),
                'canShow' => $this->user->can('show teacher'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            "name" => $data['name'],
            "email" => $data['email'],
            "password" => $data['password'],
        ]);
        $user->assignRole('guru');

        $data['user_id'] = $user->id;
        $data = Teacher::create($data);

    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        return Inertia::render('teacher/show', [
            'teacher' => $teacher->load('user', 'classrooms', 'lessons'),
            'roles' => $teacher->user->getRoleNames()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $data = $request->validated();
        $teacher->update($data);

        $teacher->user->update([
            'name'=> $teacher->name,
            'email'=> $teacher->email
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateTeacherRequest $request)
    {
        $data = $request->validated();
        Teacher::whereIn('id', $data['teacher_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteTeacherRequest $request)
    {
        $data = $request->validated();
        Teacher::whereIn('id', $data['teacher_ids'])->delete();
    }

        /**
     * View archived resource from storage.
     */
    public function archived()
    {
        return Inertia::render('teacher/archived', [
            'teachers' => Teacher::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $model = Teacher::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $model = Teacher::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }
}
