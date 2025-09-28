<?php

return [
    'perkembangan' => [
        'tahunajaran' => '',
        'semester' => '',
        'nama' => '',
        'kelas' => '',
        'usia' => '',
        'nisn' => '',
        'walikelas' => '',
        'curricular_domain' => [
            [
                'name' => 'ESTETIK',
                'goal' => 'Agar anak dapat mengintegritaskan perasaan, pikiran, dan tindakan melalui seni, musik, dan pengalaman sensori yang lain untuk memperoleh kesenangan dan akhirnya memahami dirinya.',
                'points' => [
                    [
                        'name' => 'Enjoyment',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Stimulation',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Insight',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Satisfaction',
                        'description' => '',
                        'mark' => 'A',
                    ],
                ],
            ],
            [
                'name' => 'AFEKSI',
                'goal' => 'Agar anak merasakan mereka di sayang, mempunyai arti / makna dan sebagai pribadi yang memiliki kemampuan.',
                'points' => [
                    [
                        'name' => 'Trust',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Autonomy',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Initiative',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Industry',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Self Concept',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Self Esteem',
                        'description' => '',
                        'mark' => 'A',
                    ],
                ],
            ],
            [
                'name' => 'KOGNISI',
                'goal' => 'Agar anak dapat mengintegrasikan pengetahuan dan pengalamannya pada saat mereka mengembangkan konsep – konsep yang lebih luas.',
                'points' => [
                    [
                        'name' => 'Perception',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Physical Knowledge',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Logic-Math Knowledge',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Representational Knowledge',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Critical Thinking',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Conventional Social Knowledge',
                        'description' => '',
                        'mark' => 'A',
                    ],
                ],
            ],
            [
                'name' => 'BAHASA',
                'goal' => 'Agar anak dapat menginterpresikan secara tepat saat berkomunikasi dengan orang lain sebaik / seefektif berkomunikasi dengan diri mereka sendiri.',
                'points' => [
                    [
                        'name' => 'Listening',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Receptive',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Expressive',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Writing',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Reading',
                        'description' => '',
                        'mark' => 'A',
                    ],
                ],
            ],
            [
                'name' => 'PSIKOMOTOR',
                'goal' => 'Agar anak dapat menguasai lingkungan melalui peningkatan control tubuh dan pengembangan sikap, pengetahuan, keterampilan – keterampilan, dan perilaku – perilaku yang berhubungan dalam memelihara, menghormati, dan melindungi diri mereka sendiri.',
                'points' => [
                    [
                        'name' => 'Body Awarness',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Gross Motor',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Fine Motor',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Physical Health',
                        'description' => '',
                        'mark' => 'A',
                    ],
                ],
            ],
            [
                'name' => 'SOCIAL',
                'goal' => 'Agar anak dapat mengembangkan pola – pola dari interaksi social secara sukses juga nilai – nilai social dan   control diri.',
                'points' => [
                    [
                        'name' => 'Social Skill',
                        'description' => '',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Socialization',
                        'description' => '',
                        'mark' => 'A',
                    ],
                ],
            ],
        ],
        'sikap' => [], // isinya [[string => number]],
        'ekskul' => [
            [
                'nama' => '',
                'kegiatan' => '',
            ],
        ],
        'ketidakhadiran' => [
            'sakit' => 0,
            'izin' => 0,
            'tanpa keterangan' => 0,
        ],
        'komentar_guru' => '',
        'komentar_wali' => '',
        'komentar_siswa' => '',
    ],
    'nilai' => [
        'tahunajaran' => '',
        'semester' => '',
        'nama' => '',
        'kelas' => '',
        'usia' => '',
        'nisn' => '',
        'walikelas' => '',
        'naik_kelas' => null,
        'ke_kelas' => '',
        'keputusan' => 'Berdasarkan pencapaian kompetensi pada semester 1 dan 2, peserta didik dinyatakan :',
        'tanggal' => '',
        'rapor_kenaikan_kelas' => false,
        'nilai' => [],
    ],
    'tahfidz' => [
        'tahunajaran' => '',
        'semester' => '',
        'nama' => '',
        'kelas' => '',
        'usia' => '',
        'nisn' => '',
        'walikelas' => '',
        'tangggal' => '',
        'nilai' => [
            [
                'juz' => '',
                'surah' => '',
                'pencapaian' => '',
                'keterangan' => '',
            ],
        ],
        'catatan' => "Semoga ananda (nama anak) tetap rajin muroja'ah di rumah agar hafalan Surah Al Qur'an-nya tetap terjaga",
        'pembimbing' => '',
        'koordinator' => '',
    ],
    'tahsin' => [
        'tahunajaran' => '',
        'semester' => '',
        'nama' => '',
        'kelas' => '',
        'usia' => '',
        'nisn' => '',
        //
        'jilid' => '',
        'hal' => '',
        'nilai_kkm' => '',
        'nilai_rapor' => '',
        'nilai_rentang' => '',
        'titik_kuat' => '',
        'titik_lemah' => '',
        'komentar_guru' => '',
        'tanggal' => '',
        'pembimbing' => '',
        'koordinator' => '',
    ],
    'doa-hadist' => [
        'tahunajaran' => '',
        'semester' => '',
        'nama' => '',
        'kelas' => '',
        'usia' => '',
        'nisn' => '',
        'walikelas' => '',
        'doa' => [
            [
                "judul" => "",
                "pencapaian" => "",
                "keterangan" => "",
            ]
        ],
        'hadist' => [
            [
                "judul" => "",
                "pencapaian" => "",
                "keterangan" => "",
            ]
        ],
    ],
    'praktik-sholat' => [
        'tahunajaran' => '',
        'semester' => '',
        'nama' => '',
        'kelas' => '',
        'usia' => '',
        'nisn' => '',
        'walikelas' => '',
        'bacaan' => [],
        'gerakan' => [],
    ],
    'adzan-wudhu' => [
        'tahunajaran' => '',
        'semester' => '',
        'nama' => '',
        'kelas' => '',
        'usia' => '',
        'nisn' => '',
        'walikelas' => '',
        'adzan' => [],
        'wudhu' => [],
    ],
];
