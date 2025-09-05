<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\Lesson;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        return [
            'classroom_id' => Classroom::pluck('id')->random(),
            'subject_id' => Subject::pluck('id')->random(),
            'user_id' => User::role(['guru', 'walikelas'])->pluck('id')->random(),
        ];
    }
}
