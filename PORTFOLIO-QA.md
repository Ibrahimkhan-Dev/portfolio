# Portfolio QA review

Reviewed 24 November 2026 and updated 25 November 2026. The portfolio presents Muhammad Ibrahim Khan as a full-stack developer working with .NET, Angular and SQL Server. Its strongest evidence is the distinction between what he personally delivered, what his team delivered and what remained a prototype.

## Findings to resolve first

| Priority | Finding | Recommended action |
| --- | --- | --- |
| Resolved | Ibrahim confirmed his personal ERP work at Sanwa Systems ran from May 2024 through November 2025. The case study and employment entry now use this range. | Confirmed with Ibrahim on 25 November 2026. |
| Before relying on contact enquiries | The supplied local screenshot shows Turnstile’s testing banner. The handler requires server credentials, successful verification and the configured production hostname. A green local widget alone cannot establish email delivery. | On the intended production domain, use a controlled recipient to verify one submission, receipt, sender name, reply address and confirmation. Confirm that the testing banner is absent there. |
| Before visual sign-off | The new scroll treatment, galleries, sticky navigation and densely grouped credentials need a real viewport and input device for final judgement. | Use the device checks below. Record the viewport and screenshot for any clipped text, unexpected jump or obscured control. |

## Home page and wording

| Area | Change made or recommendation |
| --- | --- |
| Navigation | Changed “Work” to “Experience” to distinguish employment from projects. “Skills” now matches the destination. Fixed direct entry to deferred sections via links such as /#skills and /#contact. |
| First impression | Replaced the repeated role title in the introduction with “I build .NET APIs and Angular applications backed by SQL Server.” The following sentence names the domains. The 3+ years label now reads “Years of experience.” |
| Hero performance | Converted the original transparent portrait to two WebP sizes. The 1,122-pixel image is 141,492 bytes and the 560-pixel image is 37,494 bytes. The original was 1,497,761 bytes. These are file sizes. Download selection depends on the screen and pixel density. |
| Projects | The ZenaTrace summary now leads with the working web MVP and the medicine-tracing workflow. It identifies the separate mobile R&D track. |
| Experience | The heading now reads "From Python APIs to enterprise .NET." |
| Education and credentials | Corrected "TA (Teacher Assistant)" to "teaching assistant." Replaced the generic profile label with a reference to the final-year prototype. Each credential now displays whether it is a course, workshop, training program or certification. |
| Skills | All 35 skills are visible. The title can now wrap when enlarged text needs more space. Keep this section generic and use the project pages to demonstrate individual technologies. |
| Contact | Name, Email and Message are the three user fields. Background verification feedback moves keyboard focus only when the visitor is already in the form. The phone card provides a call action. |

## Case study wording

| Case study | Editorial update |
| --- | --- |
| ZenaTrace | The opening summary now names the working web MVP, medicine-tracing workflow and mobile R&D track. The detailed page retains the documented review of 37 pages across seven viewport sizes. |
| EHR modernization | The summary spells out electronic health record and foregrounds support for live workflows during modernization. |
| ONC EHI export | The summary foregrounds patient and population health data exports and describes the contribution as support for certification preparation. |
| ERP modernization | The title now reads "Automotive ERP Modernization." The summary leads with inventory and warehouse workflows and the confirmed contribution dates. |
| Selenium automation | The summary credits the teammate and explains explicit waits and error handling on dynamic pages. |
| IoT home automation | The summary names the final-year prototype and links Flutter controls, Django APIs and ESP8266/Arduino hardware. |
| OpenStack lab | The summary credits the four-person team and the five-node lab. Individual ownership needs evidence before attribution. |

## Responsive layout and motion

Each home section recedes as the next section rises over it with an orange edge. The hero has a longer desktop travel, while phones and tablets keep the hero stationary and use a shorter transition for the following sections. The Experience connectors fill as their milestones enter view and retrace when scrolling back. Reduced motion and browsers without the required CSS timeline support show static sections and a completed timeline.

| Viewport | Source-level findings and device checks |
| --- | --- |
| 320 and 390 px | Skills and contact use one column. Certificate navigation now sits below the full-width cards with 44-pixel controls. Check the longest certificate title, the email address, and the verification widget on an actual phone. |
| 768 and 820 px | Skills use two columns. The contact form now stays below the contact details throughout this tablet range. Previously the two-column contact layout began at 801 px, squeezing four contact cards into roughly half the screen. |
| 1,024 px | Desktop navigation, the two-column hero and the two-column contact section are active. Check the full navigation row and the email card at this boundary, especially with larger default fonts. |
| 1,440 px | Check the hero-to-project transition in both directions. Tab into a project before scrolling and verify the focused control remains visible. |
| Enlarged text and reduced motion | At 200% zoom, check heading wrapping, dialog scrolling and access to the close button. With reduced motion enabled, navigate directly to Skills and Contact and check that the section does not scale or drift. |

## Verification and limits

Rendered the home sections, all seven case studies and an unknown project route to HTML. Checked duplicate IDs, missing image alt attributes and local files referenced by rendered links and images. These checks passed. The unknown project displayed a recovery heading. An alt attribute check verifies presence only. It cannot judge whether a description is useful.

The existing suite covers project data, gallery loading and error states, carousel navigation, project evidence and other case-study components. Reviewed responsive CSS breakpoints and the reduced-motion condition. Live browser measurements, physical devices, assistive technology, external credential destinations, live Cloudinary responses and production email delivery remain unverified.

The production build, TypeScript check, lint and all 61 existing tests passed. A separate local form exercise checked invalid name, email and message inputs, missing verification, simulated successful submission and form reset. It used a mocked email service and verification widget.
