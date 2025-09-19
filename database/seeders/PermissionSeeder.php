<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissionGroups = [
            'dashboard' => [
                'dashboard' => ['*'],
                'profile' => ['*'],
                'documentation' => ['*'],
            ],
            'ppdb' => [
                'menu ppdb' => ['admin'],
                'index ppdb' => ['admin'],
                'show ppdb' => ['*'],
                'create ppdb' => ['admin'],
                'update ppdb' => ['admin'],
                'delete ppdb' => ['admin'],
                'setting ppdb' => ['admin'],
            ],
            'absent' => [
                'menu absent' => ['admin'],
                'index absent' => ['admin'],
                'show absent' => ['*'],
                'create absent' => ['admin', 'walikelas'],
                'update absent' => ['admin', 'walikelas'],
                'delete absent' => ['admin', 'walikelas'],
            ],
            'academicyear' => [
                'menu academicyear' => ['admin'],
                'index academicyear' => ['admin'],
                'show academicyear' => [],
                'create academicyear' => ['admin'],
                'update academicyear' => ['admin'],
                'delete academicyear' => [],
            ],
            'assignment' => [
                'menu assignment' => ['admin', 'guru'],
                'index assignment' => ['admin', 'guru'],
                'show assignment' => ['*'],
                'create assignment' => ['admin', 'guru'],
                'update assignment' => ['admin', 'guru'],
                'delete assignment' => ['admin', 'guru'],
            ],
            'bill' => [
                'menu bill' => ['admin'],
                'student bill' => ['orangtua'],
                'index bill' => ['admin'],
                'show bill' => ['admin', 'orangtua'],
                'create bill' => ['admin'],
                'update bill' => ['admin'],
                'delete bill' => ['admin'],
            ],
            'classroom' => [
                'menu classroom' => ['admin'],
                'index classroom' => ['admin'],
                'show classroom' => ['*'],
                'create classroom' => ['admin'],
                'update classroom' => ['admin', 'walikelas'],
                'delete classroom' => ['admin'],
            ],
            'extracurricular' => [
                'menu extracurricular' => ['admin'],
                'index extracurricular' => ['admin'],
                'show extracurricular' => ['admin'],
                'create extracurricular' => ['admin'],
                'update extracurricular' => ['admin'],
                'delete extracurricular' => ['admin'],
            ],
            'grade' => [
                'menu grade' => ['admin'],
                'index grade' => ['admin'],
                'show grade' => ['admin'],
                'create grade' => ['admin'],
                'update grade' => ['admin'],
                'delete grade' => ['admin'],
            ],
            'lesson' => [
                'menu lesson' => ['admin'],
                'index lesson' => ['admin'],
                'show lesson' => ['*'],
                'create lesson' => ['admin', 'walikelas'],
                'update lesson' => ['admin', 'walikelas'],
                'delete lesson' => ['admin', 'guru'],
            ],
            'material' => [
                'menu material' => ['admin'],
                'index material' => ['admin'],
                'show material' => ['*'],
                'create material' => ['admin', 'guru'],
                'update material' => ['admin', 'guru'],
                'delete material' => ['admin', 'guru'],
                'upload material' => ['admin', 'guru'],
            ],
            'news' => [
                'menu news' => ['admin'],
                'index news' => ['admin'],
                'show news' => ['admin'],
                'create news' => ['admin'],
                'update news' => ['admin'],
                'delete news' => ['admin'],
            ],
            'payment' => [
                'menu payment' => ['admin'],
                'index payment' => ['admin'],
                'show payment' => ['admin', 'orangtua'],
                'create payment' => ['admin', 'orangtua'],
                'update payment' => ['admin', 'orangtua'],
                'delete payment' => ['admin'],
                'approve payment' => ['admin'],
            ],
            'paymentType' => [
                'menu paymentType' => ['admin'],
                'index paymentType' => ['admin'],
                'show paymentType' => ['admin'],
                'create paymentType' => ['admin'],
                'update paymentType' => ['admin'],
                'delete paymentType' => ['admin'],
            ],
            'report' => [
                'menu report' => ['admin'],
                'index report' => ['admin'],
                'show report' => ['*'],
                'create report' => ['admin', 'walikelas'],
                'update report' => ['admin', 'walikelas'],
                'delete report' => ['admin', 'walikelas'],
                'comment report' => ['orangtua'],
            ],
            'setting' => [
                'menu setting' => ['admin'],
                'index setting' => ['admin'],
                'update setting' => ['admin'],
                'open adminer' => ['superadmin'],
            ],
            'student' => [
                'menu student' => ['admin'],
                'index student' => ['admin'],
                'show student' => ['*'],
                'create student' => ['admin'],
                'update student' => ['admin'],
                'delete student' => ['admin'],
                'archived student' => ['admin'],
                'restore student' => ['admin'],
                'force delete student' => ['admin'],
            ],
            'subject' => [
                'menu subject' => ['admin'],
                'index subject' => ['admin'],
                'show subject' => ['admin'],
                'create subject' => ['admin'],
                'update subject' => ['admin'],
                'delete subject' => ['admin'],
            ],
            'score' => [
                'menu score' => ['admin'],
                'index score' => ['admin'],
                'show score' => ['admin', 'guru'],
                'create score' => ['admin', 'guru'],
                'update score' => ['admin', 'guru'],
                'delete score' => ['admin', 'guru'],
            ],
            'exam' => [
                'menu exam' => ['admin'],
                'index exam' => ['admin'],
                'show exam' => ['admin', 'guru'],
                'create exam' => ['admin', 'guru'],
                'update exam' => ['admin', 'guru'],
                'delete exam' => ['admin', 'guru'],
            ],
            'examscore' => [
                'menu examscore' => ['admin'],
                'index examscore' => ['admin'],
                'show examscore' => ['admin', 'guru'],
                'create examscore' => ['admin', 'guru'],
                'update examscore' => ['admin', 'guru'],
                'delete examscore' => ['admin', 'guru'],
            ],
            'role' => [
                'menu role' => ['superadmin'],
                'index role' => ['superadmin'],
                'show role' => ['superadmin'],
                'create role' => ['superadmin'],
                'update role' => ['superadmin'],
                'delete role' => ['superadmin'],
            ],
            'user' => [
                'menu user' => ['admin'],
                'index user' => ['admin'],
                'show user' => ['admin'],
                'create user' => ['admin'],
                'update user' => ['admin'],
                'delete user' => ['admin'],
                'archived user' => ['admin'],
                'restore user' => ['admin'],
                'force delete user' => ['admin'],
            ],
        ];

        foreach ($permissionGroups as $group => $permissions) {
            foreach ($permissions as $permissionName => $roles) {
                $permission = Permission::updateOrCreate([
                    'name' => $permissionName,
                    'group' => $group,
                ]);

                if ($roles === ['*']) {
                    $roles = Role::pluck('name')->toArray();
                    $permission->syncRoles($roles);
                } else {
                    $permission->syncRoles($roles);
                }
            }
        }
    }
}
