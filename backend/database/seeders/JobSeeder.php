<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Frontend Developer (React/Next.js)',
                'company' => 'BrightStack Labs',
                'location' => 'Dhaka',
                'category' => 'Frontend',
                'description' => 'Build and maintain modern React/Next.js interfaces. Collaborate closely with product and design teams to deliver responsive, user-focused features.',
            ],
            [
                'title' => 'Backend Engineer (Laravel)',
                'company' => 'CoreWave Technologies',
                'location' => 'Remote',
                'category' => 'Backend',
                'description' => 'Design and maintain RESTful APIs using Laravel. Own database modeling, validation, and performance optimization for critical backend services.',
            ],
            [
                'title' => 'Full Stack Developer',
                'company' => 'Nexa Solutions',
                'location' => 'Chittagong',
                'category' => 'Full Stack',
                'description' => 'Develop end-to-end features across Next.js frontend and Laravel backend. Ensure clean architecture, testability, and smooth release cycles.',
            ],
            [
                'title' => 'UI/UX Designer',
                'company' => 'PixelForge Studio',
                'location' => 'Dhaka',
                'category' => 'Design',
                'description' => 'Craft intuitive user flows and polished visual designs for web products. Work with engineers to translate Figma concepts into production-ready experiences.',
            ],
            [
                'title' => 'QA Engineer',
                'company' => 'Veritas Systems',
                'location' => 'Remote',
                'category' => 'QA',
                'description' => 'Create and execute test plans for web applications. Identify regressions, automate key flows, and improve product reliability across releases.',
            ],
        ];

        foreach ($jobs as $job) {
            Job::create($job);
        }
    }
}
