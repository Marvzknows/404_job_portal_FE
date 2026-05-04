"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Menu,
  Search,
  Sparkles,
  Target,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
              <Briefcase className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              404 Jobs
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#for-job-seekers"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-violet-600"
            >
              For Job Seekers
            </a>
            <a
              href="#for-employers"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-violet-600"
            >
              For Employers
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-violet-600"
            >
              How it works
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-violet-600 hover:bg-violet-700">
              <Link href="/register">Sign up</Link>
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              <a
                href="#for-job-seekers"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-violet-50 hover:text-violet-700"
              >
                For Job Seekers
              </a>
              <a
                href="#for-employers"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-violet-50 hover:text-violet-700"
              >
                For Employers
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-violet-50 hover:text-violet-700"
              >
                How it works
              </a>
              <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100 via-white to-white"
        />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28 lg:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              <Sparkles className="h-3.5 w-3.5" />
              The smarter way to hire and get hired
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find your next{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                opportunity
              </span>
              , faster.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              404 Jobs connects ambitious job seekers with companies that value
              them. Browse thousands of roles, apply in a click, and manage your
              hiring pipeline — all in one place.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-violet-600 hover:bg-violet-700 sm:w-auto"
              >
                <Link href="/register">
                  Get started — it&apos;s free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-700 sm:w-auto"
              >
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-violet-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-violet-500" />
                Job seekers &amp; employers welcome
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-violet-500" />
                Built for the Philippines
              </span>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "10k+", label: "Active jobs" },
              { value: "5k+", label: "Companies" },
              { value: "50k+", label: "Job seekers" },
              { value: "98%", label: "Would recommend" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
              >
                <div className="text-2xl font-bold text-violet-600 sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Two sides, one platform
            </h2>
            <p className="mt-3 text-muted-foreground">
              Whether you&apos;re looking for your next role or your next hire,
              we&apos;ve built tools to make it effortless.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
            <div
              id="for-job-seekers"
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                For job seekers
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Discover roles that match your skills and track every
                application in one tidy dashboard.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Browse curated job listings from verified employers",
                  "Save jobs and apply with a single click",
                  "Track every application from sent to hired",
                  "Build a profile that gets noticed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6">
                <Button
                  asChild
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  <Link href="/register">
                    Find jobs
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div
              id="for-employers"
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                For employers
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Post jobs, review qualified applicants, and manage your hiring
                pipeline without the mess.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Post unlimited job listings in minutes",
                  "Review applications in a structured workflow",
                  "Track hiring metrics from your dashboard",
                  "Keep your employer profile front and center",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-700"
                >
                  <Link href="/register">
                    Start hiring
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-violet-50/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three steps. That&apos;s all it takes to get moving.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: UserPlus,
                step: "01",
                title: "Create your account",
                desc: "Sign up as a job seeker or employer in less than a minute.",
              },
              {
                icon: Search,
                step: "02",
                title: "Find the right match",
                desc: "Browse listings or post a job and let qualified candidates find you.",
              },
              {
                icon: Target,
                step: "03",
                title: "Apply or hire",
                desc: "Submit applications or review candidates — everything stays organized.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="absolute right-5 top-5 text-4xl font-bold text-violet-100">
                  {s.step}
                </span>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to move forward
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built with the features that actually matter — no bloat.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Smart job listings",
                desc: "Rich listings with salary ranges, job types, and location filters.",
              },
              {
                icon: ClipboardList,
                title: "Application tracking",
                desc: "Watch every application change status in real time.",
              },
              {
                icon: FileText,
                title: "Saved jobs",
                desc: "Bookmark roles you love and apply when you're ready.",
              },
              {
                icon: Users,
                title: "Rich profiles",
                desc: "Profiles designed to showcase experience, not hide it.",
              },
              {
                icon: Target,
                title: "Dashboard insights",
                desc: "At-a-glance stats for both job seekers and employers.",
              },
              {
                icon: Sparkles,
                title: "Clean, fast UI",
                desc: "Built with modern tools so everything just feels quick.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-violet-200 hover:shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="relative mt-3 text-sm text-violet-100 sm:text-base">
              Create your free account and join thousands moving forward with
              404 Jobs.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-violet-700 hover:bg-violet-50 sm:w-auto"
              >
                <Link href="/register">
                  Create free account
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-600 text-white">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              404 Jobs
            </span>
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-violet-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="hover:text-violet-600 transition-colors"
            >
              Sign up
            </Link>
            <a
              href="#how-it-works"
              className="hover:text-violet-600 transition-colors"
            >
              How it works
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
