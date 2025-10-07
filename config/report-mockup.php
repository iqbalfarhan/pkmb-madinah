<?php

return [
    'address' => [
        'jalan' => fake()->address(),
        'dusun' => fake()->word(),
        'rt' => fake()->numerify('##'),
        'rw' => '',
        'kelurahan' => fake()->word(),
        'kodepos' => fake()->numerify('######'),
        'kecamatan' => fake()->word(),
        'kota' => 'Balikpapan',
        'provinsi' => 'Kalimantan Timur',
    ],
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
                        'description' => 'Anak terlihat antusias dan gembira saat mengikuti kegiatan seni dan musik.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Stimulation',
                        'description' => 'Anak mampu merespon rangsangan warna dan suara dengan baik dalam aktivitas kreatif.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Insight',
                        'description' => 'Anak mulai mampu menghubungkan pengalaman estetis dengan perasaan pribadinya.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Satisfaction',
                        'description' => 'Anak menunjukkan rasa bangga dan puas setelah menyelesaikan karya seni.',
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
                        'description' => 'Anak dapat mempercayai guru dan teman-temannya dalam berbagai kegiatan.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Autonomy',
                        'description' => 'Anak mulai berani mencoba menyelesaikan tugas sederhana secara mandiri.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Initiative',
                        'description' => 'Anak aktif mengajukan ide dan bersemangat memulai kegiatan.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Industry',
                        'description' => 'Anak berusaha menyelesaikan tugas dengan tekun meskipun menemui kesulitan.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Self Concept',
                        'description' => 'Anak semakin memahami dirinya dan menunjukkan identitas positif.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Self Esteem',
                        'description' => 'Anak menunjukkan rasa percaya diri ketika tampil di depan kelas.',
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
                        'description' => 'Anak mampu mengenali benda dan situasi di sekitarnya dengan baik.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Physical Knowledge',
                        'description' => 'Anak dapat memahami hubungan sebab-akibat melalui percobaan sederhana.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Logic-Math Knowledge',
                        'description' => 'Anak mampu menghitung dan menggunakan logika sederhana dalam kegiatan sehari-hari.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Representational Knowledge',
                        'description' => 'Anak dapat menggambarkan ide dengan simbol atau gambar sederhana.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Critical Thinking',
                        'description' => 'Anak mulai mampu bertanya kritis dan mencari solusi atas masalah kecil.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Conventional Social Knowledge',
                        'description' => 'Anak memahami aturan kelas dan berusaha mematuhinya dengan baik.',
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
                        'description' => 'Anak dapat mendengarkan penjelasan guru dengan baik dan penuh perhatian.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Receptive',
                        'description' => 'Anak mampu memahami instruksi sederhana dan melaksanakannya dengan benar.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Expressive',
                        'description' => 'Anak mampu menyampaikan pendapat dan perasaan dengan jelas.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Writing',
                        'description' => 'Anak mulai menulis kata dan kalimat sederhana dengan rapi.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Reading',
                        'description' => 'Anak mampu membaca kata sederhana dan memahami isi bacaan singkat.',
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
                        'description' => 'Anak menyadari fungsi anggota tubuhnya dan menggunakannya dengan tepat.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Gross Motor',
                        'description' => 'Anak menunjukkan kemampuan motorik kasar seperti berlari dan melompat dengan baik.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Fine Motor',
                        'description' => 'Anak mampu menggunakan jari tangan dengan terampil saat menulis dan menggambar.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Physical Health',
                        'description' => 'Anak menjaga kebersihan diri dan menunjukkan kebiasaan hidup sehat.',
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
                        'description' => 'Anak mampu bekerja sama dengan teman dan menghargai pendapat orang lain.',
                        'mark' => 'A',
                    ],
                    [
                        'name' => 'Socialization',
                        'description' => 'Anak menunjukkan sikap ramah, mudah bergaul, dan mampu beradaptasi di lingkungan kelas.',
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
                'judul' => '',
                'pencapaian' => '',
                'keterangan' => '',
            ],
        ],
        'hadist' => [
            [
                'judul' => '',
                'pencapaian' => '',
                'keterangan' => '',
            ],
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
