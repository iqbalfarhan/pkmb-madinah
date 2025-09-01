<?php

namespace App\Http\Middleware;

use App\Models\AcademicYear;
use App\Models\Setting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        $user = $request->user();

        // dd($user?->teacher->lessons);

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user()?->getRoleNames(),
            ],
            'menus' => [
                "adminer" => $user?->can('open adminer'),
                "documentation" => $user?->can('documentation'),
                "studentBill" => $user?->can('student bill'),

                // Pengaturan
                "ppdb" => $user?->can('menu ppdb'),
                "academicyear" => $user?->can('menu academicyear'),
                "teacher" => $user?->can('menu teacher'),
                "news" => $user?->can('menu news'),
                "setting" => $user?->can('menu setting'),

                // list master data
                "grade" => $user?->can('menu grade'),
                "subject" => $user?->can('menu subject'),
                "extracurricular" => $user?->can('menu extracurricular'),
                "paymenttype" => $user?->can('menu paymenttype'),

                // list pengaturan kelas
                "classroom" => $user?->can('menu classroom'),
                "lesson" => $user?->can('menu lesson'),
                "material" => $user?->can('menu material'),
                "assignment" => $user?->can('menu assignment'),
                "exam" => $user?->can('menu exam'),

                // list pengaturan siswa
                "student" => $user?->can('menu student'),
                "report" => $user?->can('menu report'),
                "absent" => $user?->can('menu absent'),
                "score" => $user?->can('menu score'),
                "bill" => $user?->can('menu bill'),
                "activity" => $user?->can('menu activity'),

                // Authentication
                "user" => $user?->can('menu user'),
                "role" => $user?->can('menu role'),
            ],
            "myclassrooms" => $user?->teacher->classrooms ?? [],
            "mylessons" => $user?->teacher->lessons ?? [],
            "mystudents" => $user?->students ?? [],
            'activeAcademicYear' => AcademicYear::active() ?? null,
            'settings' => Setting::pluck('value', 'key'),
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
