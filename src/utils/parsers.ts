import type { ResumeSchema, ResumeType } from "@/types";

export function parseSchema(resume: ResumeSchema): ResumeType {
  const basicInfo = resume.basics ?? {};
  const contactInfo = resume.basics ?? {};
  const skills = resume.skills ?? [];
  const education = resume.education ?? [];
  const work = resume.work ?? [];
  const projects = resume.projects ?? [];

  const parsedResume: ResumeType = {
    name: basicInfo.name ?? "",
    title: basicInfo.label ?? "",
    summary: basicInfo.summary ?? "",
    contact: {
      age: "",
      location: contactInfo.location?.city ?? "",
      phone: contactInfo.phone ?? "",
      email: contactInfo.email ?? "",
      github:
        contactInfo.profiles?.find(
          (profile) => profile.network?.toLowerCase() === "github"
        )?.username ?? ""
    },
    skills: skills.map((skill) => ({
      name: skill.name ?? ""
    })),
    education: education.map((edu) => ({
      school: edu.institution ?? "",
      degree: edu.studyType ?? "",
      bullets: edu.courses ?? []
    })),
    experience: work.map((exp) => ({
      company: {
        name: exp.name ?? "",
        url: exp.url ?? ""
      },
      jobTitle: exp.position ?? "",
      date: `${exp.startDate ?? ""} - ${exp.endDate ?? ""}`,
      projects:
        exp.highlights?.map((highlight) => ({
          title: "",
          bullets: [highlight],
          stack: []
        })) ?? []
    })),
    oss: projects.map((project) => ({
      title: project.name ?? "",
      url: project.url ?? "",
      description: project.description ?? ""
    }))
  };

  return parsedResume;
}
