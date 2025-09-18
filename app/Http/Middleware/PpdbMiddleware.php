<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PpdbMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        $setting = Setting::where('key', 'PPDB_OPEN')->first();
        $active = $setting ? $setting->value === 'true' : false;

        if ($active || $user?->can('setting ppdb')) {
            return $next($request);
        }

        abort(403, 'Sesi ppdb belum dibuka');

    }
}
