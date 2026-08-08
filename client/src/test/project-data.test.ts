import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { projectCards } from "@/data/project-cards";

describe("projects data integrity", () => {
  it("every project has a non-empty id", () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
    }
  });

  it("project IDs are unique", () => {
    const ids = projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("every project has a non-empty title", () => {
    for (const project of projects) {
      expect(project.title).toBeTruthy();
    }
  });

  it("every project has a non-empty shortDesc", () => {
    for (const project of projects) {
      expect(project.shortDesc).toBeTruthy();
    }
  });

  it("every project has at least one tech tag", () => {
    for (const project of projects) {
      expect(project.tech.length).toBeGreaterThan(0);
    }
  });

  it("all gallery items are non-empty strings when present", () => {
    for (const project of projects) {
      if (project.gallery) {
        for (const item of project.gallery) {
          expect(typeof item).toBe("string");
          expect(item.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("projectCards data integrity", () => {
  it("every card has a non-empty id", () => {
    for (const card of projectCards) {
      expect(card.id).toBeTruthy();
    }
  });

  it("card IDs are unique", () => {
    const ids = projectCards.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("every card matches a project by ID", () => {
    const projectIds = new Set(projects.map((p) => p.id));
    for (const card of projectCards) {
      expect(projectIds.has(card.id)).toBe(true);
    }
  });

  it("every card has a non-empty shortDesc", () => {
    for (const card of projectCards) {
      expect(card.shortDesc).toBeTruthy();
    }
  });

  it("every card has at least one tech tag", () => {
    for (const card of projectCards) {
      expect(card.tech.length).toBeGreaterThan(0);
    }
  });
});
