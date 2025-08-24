<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\Lesson;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        return [
            'classroom_id' => Classroom::pluck('id')->random(),
            'subject_id' => Subject::pluck('id')->random(),
            'teacher_id' => Teacher::pluck('id')->random(),
        ];
    }
}
