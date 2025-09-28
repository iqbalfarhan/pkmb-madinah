<?php

namespace App\Helpers;

use App\AnyFormatter;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Examscore;
use App\Models\Score;
use App\Models\Student;
use Illuminate\Support\Collection;

class ReportHelper
{
    /**
     * Generate report data based on report type
     */
    public static function generateReportData(array $data, Student $student, AcademicYear $academicYear, Classroom $classroom, Collection $assessments, $settings): array
    {
        $mockup = config('report-mockup')[$data['report_type']];
        
        // Set common data for all report types
        $mockup = self::setCommonData($mockup, $student, $academicYear, $classroom, $settings);
        
        // Set specific data based on report type
        switch ($data['report_type']) {
            case 'perkembangan':
                $mockup = self::setPerkembanganData($mockup, $student, $classroom);
                break;
            case 'nilai':
                $mockup = self::setNilaiData($mockup, $student, $academicYear, $classroom);
                break;
            case 'tahfidz':
                $mockup = self::setTahfidzData($mockup, $student, $settings);
                break;
            case 'tahsin':
                $mockup = self::setTahsinData($mockup, $student, $settings);
                break;
            case 'doa-hadist':
                $mockup = self::setAssessmentData($mockup, "doa-hadist", $assessments, $settings);
                break;
            case 'praktik-sholat':
                $mockup = self::setAssessmentData($mockup, "praktik-sholat", $assessments, $settings);
                break;
            case 'adzan-wudhu':
                $mockup = self::setAssessmentData($mockup, "adzan-wudhu", $assessments, $settings);
                break;
        }
        
        return $mockup;
    }

    /**
     * Set common data for all report types
     */
    private static function setCommonData(array $mockup, Student $student, AcademicYear $academicYear, Classroom $classroom, $settings): array
    {
        $mockup['tahunajaran'] = $academicYear->year;
        $mockup['semester'] = $academicYear->semester;
        $mockup['nama'] = $student->name;
        $mockup['kelas'] = $classroom->name;
        $mockup['walikelas'] = $classroom->user->name ?? '';
        $mockup['usia'] = $student->umur;
        $mockup['nisn'] = $student->nisn;
        $mockup['tanggal'] = $settings['SCHOOL_CITY'] . ', ' . now()->format('d F Y');
        
        return $mockup;
    }

    /**
     * Set data specific to perkembangan report type
     */
    private static function setPerkembanganData(array $mockup, Student $student, Classroom $classroom): array
    {
        // Handle absence data
        $sakit = $student->absents->where('reason', 'sakit')->count() ?? 0;
        $izin = $student->absents->where('reason', 'izin')->count() ?? 0;
        $alpa = $student->absents->where('reason', 'tanpa keterangan')->count() ?? 0;

        $mockup['ketidakhadiran']['sakit'] = AnyFormatter::hariNumberDescription($sakit);
        $mockup['ketidakhadiran']['izin'] = AnyFormatter::hariNumberDescription($izin);
        $mockup['ketidakhadiran']['tanpa keterangan'] = AnyFormatter::hariNumberDescription($alpa);

        // Handle extracurricular activities
        $mockup['ekskul'] = $student->activities->load(['extracurricular'])->map(function ($ekskul) {
            return [
                'nama' => $ekskul->extracurricular->name,
                'kegiatan' => $ekskul->description,
            ];
        });

        // Handle character traits
        $characters = collect($classroom->grade->characters);
        foreach ($characters as $sikap) {
            $mockup["sikap"][$sikap] = 1;
        }

        return $mockup;
    }

    /**
     * Set data specific to nilai report type
     */
    private static function setNilaiData(array $mockup, Student $student, AcademicYear $academicYear, Classroom $classroom): array
    {
        $mockup['rapor_kenaikan_kelas'] = $academicYear->semester === 'ganjil' ? false : true;
        $mockup['naik_kelas'] = null;
        $mockup['ke_kelas'] = '';

        $mockup['nilai'] = $classroom->lessons?->map(function ($lesson) use ($student) {
            $lesson = $lesson->load('exams.examscores', 'assignments.scores');
            $subject = $lesson->subject;

            $score = Score::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;
            $examscore = Examscore::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;

            return [
                'name' => $subject->name,
                'type' => $subject->group,
                'nilai_tugas' => $score,
                'evaluasi' => $examscore,
                'rata_rata' => ($score + $examscore) / 2,
            ];
        });

        return $mockup;
    }

    /**
     * Set data specific to tahfidz report type
     */
    private static function setTahfidzData(array $mockup, Student $student, $settings): array
    {
        $mockup['koordinator'] = $settings['KOORDINATOR_Al-MUYASSAR'];
        $mockup['catatan'] = "Semoga ananda {$student->name} tetap rajin muroja'ah di rumah agar hafalan Surah Al Qur'an-nya tetap terjaga";
        
        return $mockup;
    }

    /**
     * Set data specific to tahsin report type
     */
    private static function setTahsinData(array $mockup, Student $student, $settings): array
    {
        $mockup['jilid'] = '';
        $mockup['periode'] = '';
        $mockup['hal'] = '';
        $mockup['nilai_kkm'] = '';
        $mockup['nilai_rapor'] = '';
        $mockup['nilai_rentang'] = '';
        $mockup['titik_kuat'] = '';
        $mockup['titik_lemah'] = '';
        $mockup['koordinator'] = $settings['KOORDINATOR_Al-MUYASSAR'] ?? "";
        $mockup['komentar_guru'] = "Alhamdulillah Ananda {$student->name} semangat dalam mengikuti kegiatan tahsin dan pastikan tetap dipertahankan. Semoga Ananda {$student->name} menjadi anak yang selalu mengamalkan isi Al-Qur’an dan menjadi penghafal Al-Qur’an. Aamiin.";
        $mockup['pembimbing'] = '';
        
        return $mockup;
    }

    /**
     * Set data specific to doa-hadist report type
     */
    private static function setAssessmentData(array $mockup, string $type, Collection $assessments, $settings ): array
    {

        $mockup['koordinator'] = $settings['KOORDINATOR_Al-MUYASSAR'];

        if ($type === "doa-hadist") {
            $mockup['doa'] = $assessments->where('group', 'doa harian')->map(function($doa){
                return [
                    "judul" => $doa['name'],
                    "pencapaian" => "Berkembang",
                    "keterangan" => "",
                ];
            })->values() ?? [];
    
            $mockup['hadist'] = $assessments->where('group', 'hadist')->map(function($doa){
                return [
                    "judul" => $doa['name'],
                    "pencapaian" => "Berkembang",
                    "keterangan" => "",
                ];
            })->values() ?? [];
        }
        elseif ($type === "praktik-sholat") {
            $mockup['gerakan'] = $assessments->where('group', 'gerakan sholat')->map(function($doa){
                return [
                    "judul" => $doa['name'],
                    "pencapaian" => "Berkembang",
                    "keterangan" => "",
                ];
            })->values() ?? [];
    
            $mockup['bacaan'] = $assessments->where('group', 'bacaan sholat')->map(function($doa){
                return [
                    "judul" => $doa['name'],
                    "pencapaian" => "Berkembang",
                    "keterangan" => "",
                ];
            })->values() ?? [];
            
        }
        elseif ($type === "adzan-wudhu") {
            $mockup['adzan'] = $assessments->where('group', 'adzan')->map(function($doa){
                return [
                    "judul" => $doa['name'],
                    "pencapaian" => "Berkembang",
                    "keterangan" => "",
                ];
            })->values() ?? [];
    
            $mockup['wudhu'] = $assessments->where('group', 'tata cara wudhu')->map(function($doa){
                return [
                    "judul" => $doa['name'],
                    "pencapaian" => "Berkembang",
                    "keterangan" => "",
                ];
            })->values() ?? [];
        }
        
        return $mockup;
    }

    /**
     * Generate lesson scores for a student
     */
    public static function generateLessonScores(Student $student, Classroom $classroom): array
    {
        return $classroom->lessons?->map(function ($lesson) use ($student) {
            $lesson = $lesson->load('exams.examscores', 'assignments.scores');
            $subject = $lesson->subject;

            $score = Score::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;
            $examscore = Examscore::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;

            return [
                'name' => $subject->name,
                'type' => $subject->group,
                'nilai_tugas' => $score,
                'evaluasi' => $examscore,
                'rata_rata' => ($score + $examscore) / 2,
            ];
        })->toArray() ?? [];
    }
}
