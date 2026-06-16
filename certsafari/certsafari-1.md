# Claude Certified Architect Foundations - Questions and Correct Answers

## Question 1 (Q1)

A document analysis agent discovers that two credible sources contain directly contradictory statistics for a key metric: a government report states 40% growth, while an industry analysis states 12%. Both sources look credible, and the discrepancy could materially affect the research conclusions. How should the document analysis agent handle this situation most effectively?

- A. Apply credibility heuristics to pick the most likely correct number, finish analysis with that value, and add a footnote mentioning the discrepancy.
- B. Include both numbers in the analysis output without marking them as conflicting, letting the synthesis agent decide which to use based on broader context.
- C. Stop analysis and immediately escalate to the coordinator, asking it to decide which source is more authoritative before continuing.
- **D. Complete analysis with both numbers, explicitly annotate the conflict with source attribution, and let the coordinator decide how to reconcile the data before passing to synthesis. ✅**

## Question 2 (Q2)

The web-search and document-analysis agents have completed their tasks and returned results to the coordinator. What is the next step for creating an integrated research report?

- A. Each agent sends its results directly to the report-writing agent, bypassing the coordinator.
- B. The document analysis agent requests web-search results and merges them internally.
- **C. The coordinator passes both sets of results to the synthesis agent for a unified integration. ✅**
- D. The coordinator concatenates the raw outputs from both agents and returns them as the final result.

## Question 3 (Q3)

A document analysis subagent frequently fails when processing PDF files: some have corrupted sections that trigger parsing exceptions, others are password-protected, and sometimes the parsing library hangs on large files. Currently, any exception immediately terminates the subagent and returns an error to the coordinator, which must decide whether to retry, skip, or fail the whole task. This causes excessive coordinator involvement in routine error handling. What architectural improvement is most effective?

- A. Create a dedicated error-handling agent that monitors all failures via a shared queue and decides recovery actions, sending restart commands directly to subagents.
- B. Configure the subagent to always return partial results with a success status, embedding error details in metadata; the coordinator treats all responses as successful.
- C. Make the coordinator validate all documents before sending them to the subagent, rejecting documents that might cause failures.
- **D. Implement local recovery in the subagent for transient failures and escalate to the coordinator only errors it cannot resolve, including attempted steps and partial results. ✅**

## Question 4 (Q4)

After running the system on "AI impact on creative industries," you observe that every subagent completes successfully: the web-search agent finds relevant articles, the document analysis agent summarizes them correctly, and the synthesis agent produces coherent text. However, final reports cover only visual art and completely miss music, literature, and film. In the coordinator logs, you see it decomposed the topic into three subtasks: "AI in digital art," "AI in graphic design," and "AI in photography." What is the most likely root cause?

- A. The synthesis agent lacks instructions to detect coverage gaps.
- B. The document analysis agent filters out non-visual sources due to overly strict relevance criteria.
- **C. The coordinator's task decomposition is too narrow, assigning subagents work that does not cover all relevant areas. ✅**
- D. The web-search agent's queries are insufficient and should be broadened to cover more sectors.

## Question 5 (Q5)

The web-search subagent returns results for only 3 of 5 requested source categories (competitor sites and industry reports succeed, but news archives and social feeds time out). The document analysis subagent successfully processes all provided documents. The synthesis subagent must produce a summary from mixed-quality upstream inputs. Which error-propagation strategy is most effective?

- A. Continue synthesis using only successful sources and produce an output without mentioning which data was unavailable.
- B. The synthesis subagent returns an error to the coordinator, triggering a full retry or task failure due to incomplete data.
- C. The synthesis subagent asks the coordinator to retry timed-out sources with a longer timeout before starting synthesis.
- **D. Structure the synthesis output with coverage annotations that indicate which conclusions are well-supported and where gaps exist due to unavailable sources. ✅**

## Question 6 (Q6)

The document analysis subagent encounters a corrupted PDF file that it cannot parse. When designing the system's error handling, what is the most effective way to handle this failure?

- **A. Return an error with context to the coordinator agent, allowing it to decide how to proceed. ✅**
- B. Silently skip the corrupted document and continue processing the remaining files to avoid interrupting the workflow.
- C. Automatically retry parsing the document three times with exponential backoff before reporting a failure.
- D. Throw an exception that terminates the entire research workflow.

## Question 7 (Q7)

Production logs show a persistent pattern: requests like "analyze the uploaded quarterly report" are routed to the web-search agent 45% of the time instead of the document analysis agent. Reviewing tool definitions, you find that the web-search agent has a tool `analyze_content` described as "analyzes content and extracts key information," while the document analysis agent has a tool `analyze_document` described as "analyzes documents and extracts key information." How should you fix the misrouting problem?

- A. Add a pre-routing classifier that detects whether the user refers to uploaded files or web content before the coordinator decides on delegation.
- **B. Rename the web-search tool to `extract_web_results` and update its description to "processes and returns information retrieved from web search and URLs." ✅**
- C. Add few-shot examples to the coordinator prompt showing correct routing: "User uploads a quarterly report -> document analysis agent" and "User asks about a web page -> web-search agent."
- D. Expand the document analysis tool description with usage examples like "Use for uploaded PDFs, Word docs, and spreadsheets," leaving the web-search tool unchanged.

## Question 8 (Q8)

A colleague proposes that the document analysis agent should send its results directly to the synthesis agent, bypassing the coordinator. What is the main advantage of keeping the coordinator as the central hub for all communication between subagents?

- **A. The coordinator can observe all interactions, handle errors uniformly, and decide what information each subagent should receive. ✅**
- B. The coordinator batches multiple requests to subagents, reducing total API calls and overall latency.
- C. Routing through the coordinator enables automatic retry logic that direct inter-agent calls cannot support.
- D. Subagents use isolated memory, and direct communication would require complex serialization that only the coordinator can perform.

## Question 9 (Q9)

The web-search subagent times out while researching a complex topic. You need to design how information about this failure is returned to the coordinator. Which error-propagation approach best enables intelligent recovery?

- **A. Return structured error context to the coordinator including the failure type, the query executed, any partial results, and potential alternative approaches. ✅**
- B. Catch the timeout within the subagent and return an empty result set marked as successful.
- C. Implement automatic exponential-backoff retries inside the subagent, only returning a generic "search unavailable" status after exhausting retries.
- D. Propagate the timeout exception directly to the top-level handler, terminating the entire research workflow.

## Question 10 (Q10)

In your system design, you gave the document analysis agent access to a general-purpose tool `fetch_url` so it could download documents by URL. Production logs show this agent now frequently downloads search engine results pages to perform ad hoc web search--behavior that should be routed through the web-search agent--causing inconsistent results. Which fix is most effective?

- **A. Replace `fetch_url` with a `load_document` tool that validates that URLs point to document formats. ✅**
- B. Remove `fetch_url` from the document analysis agent and route all URL fetching through the coordinator to the web-search agent.
- C. Implement filtering that blocks `fetch_url` calls to known search engine domains while allowing other URLs.
- D. Add instructions to the document analysis agent prompt that `fetch_url` should only be used to download document URLs, not to search.

## Question 11 (Q11)

While researching a broad topic, you observe that the web-search agent and the document analysis agent investigate the same subtopics, leading to substantial duplication in their outputs. Token usage nearly doubles without a proportional increase in research breadth or depth. What is the most effective way to address this?

- A. Allow both agents to finish in parallel, then have the coordinator deduplicate overlapping results before passing them to the synthesis agent.
- **B. The coordinator explicitly partitions the research space before delegating, assigning each agent distinct subtopics or source types. ✅**
- C. Implement a shared-state mechanism where agents log their current focus area so other agents can dynamically avoid duplication during execution.
- D. Switch to sequential execution where document analysis runs only after web search completes, using web-search results as context to avoid duplication.

## Question 12 (Q12)

During research, the web-search subagent queries three source categories with different outcomes: academic databases return 15 relevant papers, industry reports return "0 results," and patent databases return "Connection timeout." When designing error propagation to the coordinator, which approach enables the best recovery decisions?

- A. Aggregate the results into a single success-percentage metric (e.g., "67% source coverage") with detailed logs available on demand.
- B. Report both "timeout" and "0 results" as failures requiring coordinator intervention.
- C. Retry transient failures internally and report only persistent errors.
- **D. Distinguish access failures (timeout) that require a retry decision from valid empty results ("0 results") that represent successful queries. ✅**

## Question 13 (Q13)

Production monitoring shows inconsistent synthesis quality. When aggregated results are ~75K tokens, the synthesis agent reliably cites information from the first 15K tokens (web-search headlines/snippets) and the last 10K tokens (document analysis conclusions), but often misses critical findings in the middle 50K tokens--even when they directly answer the research question. How should you restructure the aggregated input?

- A. Summarize all subagent outputs to under 20K tokens before aggregation to keep content within the model's reliable processing range.
- B. Stream subagent results to the synthesis agent incrementally, processing web-search results first to completion, then adding document analysis results.
- **C. Place a key-findings summary at the start of the aggregated input and organize detailed results with explicit section headings for easier navigation. ✅**
- D. Implement rotation that alternates which subagent's results appear first across research tasks to ensure both sources get equal top positioning over time.

## Question 14 (Q14)

In testing, the combined output of the web-search agent (85K tokens including page content) and the document analysis agent (70K tokens including chains of thought) totals 155K tokens, but the synthesis agent performs best with inputs under 50K tokens. Which solution is most effective?

- **A. Modify upstream agents to return structured data (key facts, quotes, relevance scores) instead of verbose content and reasoning. ✅**
- B. Add an intermediate summarization agent that condenses findings before passing them to synthesis.
- C. Have the synthesis agent process findings in sequential batches, maintaining state between calls.
- D. Store findings in a vector database and give the synthesis agent search tools to query during its work.

## Question 15 (Q15)

In testing, you observe that the synthesis agent often needs to verify specific claims while merging results. Currently, when verification is needed, the synthesis agent returns control to the coordinator, which calls the web-search agent and then re-invokes synthesis with the results. This adds 2-3 extra loops per task and increases latency by 40%. Your assessment shows 85% of these verifications are simple fact checks (dates, names, stats) and 15% require deeper research. Which approach most effectively reduces overhead while preserving system reliability?

- A. Give the synthesis agent access to all web-search tools so it can handle any verification need directly without coordinator loops.
- B. Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end, which then sends them all to the web-search agent at once.
- C. Have the web-search agent proactively cache extra context around each source during initial research in anticipation of synthesis needing verification.
- **D. Give the synthesis agent a limited-scope `verify_fact` tool for simple checks, while routing complex verifications through the coordinator to the web-search agent. ✅**

## Question 16 (Q16)

Your CI pipeline runs the Claude Code CLI (in `--print` mode) using CLAUDE.md to provide project context for code review, and developers generally find the reviews substantive. However, they report that integrating findings into the workflow is difficult--Claude outputs narrative paragraphs that must be manually copied into PR comments. The team wants to automatically post each finding as a separate inline PR comment at the relevant place in code, which requires structured data with file path, line number, severity level, and suggested fix. Which approach is most effective?

- A. Add an "Output Format for Review" section to CLAUDE.md with examples of structured findings so Claude learns the expected format from project context.
- **B. Use the CLI flags `--output-format json` and `--json-schema` to enforce structured findings, then parse the output to post inline comments via the GitHub API. ✅**
- C. Include explicit formatting instructions in the review prompt requiring each finding to follow a parseable template like `[FILE:path] [LINE:n] [SEVERITY:level] ...`.
- D. Keep narrative review format but add a summarization step that uses Claude to generate a structured JSON summary of findings.

## Question 17 (Q17)

Your team uses Claude Code for generating code suggestions, but you notice a pattern: non-obvious issues--performance optimizations that break edge cases, cleanups that unexpectedly change behavior--are only caught when another team member reviews the PR. Claude's reasoning during generation shows it considered these cases but concluded its approach was correct. Which approach directly addresses the root cause of this self-check limitation?

- **A. Run a second independent instance of Claude Code to review the changes without access to the generator's reasoning. ✅**
- B. Enable extended thinking mode for the generation stage to allow more thorough deliberation before producing suggestions.
- C. Add explicit self-review instructions to the generation prompt asking Claude to critique its own suggestions before finalizing output.
- D. Include full test files and documentation in prompt context so Claude better understands expected behavior during generation.

## Question 18 (Q18)

Your code review component is iterative: Claude analyzes the changed file, then may request related files (imports, base classes, tests) via tool calls to understand context before providing final feedback. Your application defines a tool that lets Claude request file contents; Claude calls the tool, gets results, and continues analysis. You're evaluating batch processing to reduce API cost. What is the primary technical limitation when considering batch processing for this workflow?

- A. Batch processing does not include correlation IDs to map outputs back to input requests.
- **B. The asynchronous model cannot execute tools mid-request and return results for Claude to continue analysis. ✅**
- C. The Batch API does not support tool definitions in request parameters.
- D. The batch processing latency of up to 24 hours is too slow for pull request feedback, although the workflow would otherwise function.

## Question 19 (Q19)

Your CI/CD system runs three Claude-based analyses: (1) fast style checks on every PR that block merging until completion, (2) comprehensive weekly security audits of the entire codebase, and (3) nightly test-case generation for recently changed modules. The Message Batches API offers 50% savings but processing can take up to 24 hours. You want to optimize API cost while maintaining an acceptable developer experience. Which combination correctly matches each task to an API approach?

- A. Use the Message Batches API for all three tasks to maximize 50% savings, configuring the pipeline to poll for batch completion.
- **B. Use synchronous calls for PR style checks; use the Message Batches API for weekly security audits and nightly test generation. ✅**
- C. Use synchronous calls for all three tasks for consistent response times, relying on prompt caching to reduce costs across workloads.
- D. Use synchronous calls for PR style checks and nightly test generation; use the Message Batches API only for weekly security audits.

## Question 20 (Q20)

Your automated reviews find real issues, but developers report the feedback is not actionable. Findings include phrases like "complex ticket routing logic" or "potential null pointer" without specifying what exactly to change. When you add detailed instructions like "always include concrete fix suggestions," the model still produces inconsistent output--sometimes detailed, sometimes vague. Which prompting technique most reliably produces consistently actionable feedback?

- A. Further refine instructions with more explicit requirements for each part of the feedback format (location, issue, severity, proposed fix).
- B. Expand the context window to include more surrounding codebase so the model has enough information to propose concrete fixes.
- C. Implement a two-pass approach where one prompt identifies issues and a second generates fixes, allowing specialization.
- **D. Add 3-4 few-shot examples showing the exact required format: identified issue, location in code, concrete fix suggestion. ✅**

## Question 21 (Q21)

Your CI pipeline includes two Claude-based code review modes: a pre-merge-commit hook that blocks PR merge until completion, and a "deep analysis" that runs overnight, polls for batch completion, and posts detailed suggestions to the PR. You want to reduce API cost using the Message Batches API, which offers 50% savings but requires polling and can take up to 24 hours. Which mode should use batch processing?

- A. Only the pre-merge-commit hook.
- **B. Only the deep analysis. ✅**
- C. Both modes.
- D. Neither mode.

## Question 22 (Q22)

Your automated review analyzes comments and docstrings. The current prompt instructs Claude to "check that comments are accurate and up to date." Findings often flag acceptable patterns (TODO markers, simple descriptions) while missing comments describing behavior the code no longer implements. What change addresses the root cause of this inconsistent analysis?

- A. Include `git blame` data so Claude can identify comments that predate recent code changes.
- B. Add few-shot examples of misleading comments to help the model recognize similar patterns in the codebase.
- C. Filter TODO, FIXME, and descriptive comment patterns before analysis to reduce noise.
- **D. Specify explicit criteria: flag comments only when the behavior they claim contradicts the code's actual behavior. ✅**

## Question 23 (Q23)

Your automated code review system shows inconsistent severity ratings--similar issues like null pointer risks are rated "critical" in some PRs but only "medium" in others. Developer surveys show growing distrust--many start dismissing findings without reading because "half are wrong." High-false-positive categories erode trust in accurate categories. Which approach best restores developer trust while improving the system?

- **A. Temporarily disable high-false-positive categories (style, naming, documentation) and keep only high-precision categories while improving prompts. ✅**
- B. Keep all categories enabled but display confidence scores with each finding so developers can decide what to investigate.
- C. Keep all categories enabled and add few-shot examples to improve accuracy for each category over the next few weeks.
- D. Apply a uniform strictness reduction across all categories to bring the overall false-positive rate down.

## Question 24 (Q24)

Your automated review generates test-case suggestions for each PR. Reviewing a PR that adds course completion tracking, Claude suggests 10 test cases, but developer feedback shows that 6 duplicate scenarios already covered by the existing test suite. What change most effectively reduces duplicate suggestions?

- **A. Include the existing test file in context so Claude can determine what scenarios are already covered. ✅**
- B. Reduce the requested number of suggestions from 10 to 5, assuming Claude prioritizes the most valuable cases first.
- C. Add instructions directing Claude to focus exclusively on edge cases and error conditions rather than success paths.
- D. Implement post-processing that filters suggestions whose descriptions match existing test names via keyword overlap.

## Question 25 (Q25)

After an initial automated review identifies 12 findings, a developer pushes new commits to address issues. Re-running review produces 8 findings, but developers report that 5 duplicate previous comments on code that was already fixed in the new commits. What is the most effective way to eliminate this redundant feedback while maintaining thoroughness?

- A. Run review only when the PR is created and in the final pre-merge state, skipping intermediate commits.
- B. Add a post-processing filter that removes findings that match previous ones by file paths and issue descriptions before posting comments.
- C. Restrict review scope to files changed in the most recent push, excluding files from earlier commits.
- **D. Include previous review findings in context and instruct Claude to report only new or still-unresolved issues. ✅**

## Question 26 (Q26)

Your pipeline script runs `claude "Analyze this pull request for security issues"`, but the job hangs indefinitely. Logs show Claude Code is waiting for interactive input. What is the correct approach to run Claude Code in an automated pipeline?

- A. Add a `--batch` flag: `claude --batch "Analyze this pull request for security issues"`.
- **B. Add the `-p` flag: `claude -p "Analyze this pull request for security issues"`. ✅**
- C. Redirect stdin from `/dev/null`: `claude "Analyze this pull request for security issues" < /dev/null`.
- D. Set the environment variable `CLAUDE_HEADLESS=true` before running the command.

## Question 27 (Q27)

A pull request changes 14 files in an inventory tracking module. A single-pass review that analyzes all files together produces inconsistent results: detailed feedback on some files but shallow comments on others, missed obvious bugs, and contradictory feedback (a pattern is flagged in one file but identical code is approved in another file in the same PR). How should you restructure the review?

- A. Run three independent full-PR review passes and flag only issues that appear in at least two of the three runs.
- **B. Split into focused passes: review each file individually for local issues, then run a separate integration-oriented pass to examine cross-file data flows. ✅**
- C. Require developers to split large PRs into smaller submissions of 3-4 files before running automated review.
- D. Switch to a larger model with a bigger context window so it can pay sufficient attention to all 14 files in one pass.

## Question 28 (Q28)

Your automated code review averages 15 findings per pull request, and developers report a 40% false-positive rate. The bottleneck is investigation time: developers must click into each finding to read Claude's rationale before deciding whether to fix or dismiss it. Your CLAUDE.md already contains comprehensive rules for acceptable patterns, and stakeholders rejected any approach that filters findings before developers see them. What change best addresses investigation time?

- **A. Require Claude to include its rationale and confidence estimate directly in each finding. ✅**
- B. Add a post-processor that analyzes finding patterns and automatically suppresses those that match historical false-positive signatures.
- C. Categorize findings as "blocking issues" vs "suggestions," with different review requirements by level.
- D. Configure Claude to show only high-confidence findings, filtering uncertain flags before developers see them.

## Question 29 (Q29)

Analysis of your automated code review shows large differences in false-positive rates by finding category: security/correctness findings have 8% false positives, performance findings 18%, style/naming findings 52%, and documentation findings 48%. Developer surveys show growing distrust--many start dismissing findings without reading because "half are wrong." High-false-positive categories erode trust in accurate categories. Which approach best restores developer trust while improving the system?

- **A. Temporarily disable high-false-positive categories (style, naming, documentation) and keep only high-precision categories while improving prompts. ✅**
- B. Keep all categories enabled but display confidence scores with each finding so developers can decide what to investigate.
- C. Keep all categories enabled and add few-shot examples to improve accuracy for each category over the next few weeks.
- D. Apply a uniform strictness reduction across all categories to bring the overall false-positive rate down.

## Question 30 (Q30)

Your team wants to reduce API costs for automated analysis. Currently, synchronous Claude calls support two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes moving both to the Message Batches API to save 50%. How should you evaluate this proposal?

- A. Move both to batch processing with fallback to synchronous calls if batches take too long.
- B. Move both workflows to batch processing with status polling to verify completion.
- **C. Use batch processing only for technical debt reports; keep synchronous calls for pre-merge checks. ✅**
- D. Keep synchronous calls for both workflows to avoid issues with batch result ordering.

## Question 31 (Q31)

You asked Claude Code to implement a function that transforms API responses into an internal normalized format. After two iterations, the output structure still doesn't match expectations--some fields are nested differently and timestamps are formatted incorrectly. You described requirements in prose, but Claude interprets them differently each time.

- A. Write a JSON schema describing the expected output structure and validate Claude's output against it after each iteration.
- **B. Provide 2-3 concrete input-output examples showing the expected transformation for representative API responses. ✅**
- C. Rewrite requirements with more technical precision, specifying exact field mappings, nesting rules, and timestamp format strings.
- D. Ask Claude to explain its current understanding of the requirements to identify where interpretations diverge.

## Question 32 (Q32)

You need to add Slack as a new notification channel. The existing codebase has clear, established patterns for email, SMS, and push channels. However, Slack's API offers fundamentally different integration approaches--incoming webhooks (simple, one-way), bot tokens (support delivery confirmation and programmatic control), or Slack Apps (two-way events, requires workspace approval). Your task says "add Slack support" without specifying integration method or requiring advanced features like delivery tracking.

- A. Start in direct execution mode using incoming webhooks to match the existing one-way notification pattern.
- **B. Switch to planning mode to explore integration options and architectural implications, then present a recommendation before implementation. ✅**
- C. Start in direct execution mode by scaffolding a Slack channel class using existing patterns, deferring the integration method decision.
- D. Start in direct execution mode using a bot-token approach to ensure delivery confirmation is possible.

## Question 33 (Q33)

Your CLAUDE.md file has grown to 400+ lines containing coding standards, testing conventions, a detailed PR review checklist, deployment instructions, and database migration procedures. You want Claude to always follow coding standards and testing conventions, but apply PR review, deploy, and migration guidance only when doing those tasks.

- A. Move all guidance into separate Skills files organized by workflow type, leaving only a brief project description in CLAUDE.md.
- B. Keep everything in CLAUDE.md but use `@import` syntax to organize into separately maintained files by category.
- C. Split CLAUDE.md into files under `.claude/rules/` with path-bound glob patterns so each rule loads only for the relevant file types.
- **D. Keep universal standards in CLAUDE.md and create Skills for workflow-specific guidance (PR review, deploy, migrations) with trigger keywords. ✅**

## Question 34 (Q34)

You're tasked with restructuring your team's monolithic application into microservices. This impacts changes across dozens of files and requires decisions about service boundaries and module dependencies.

- **A. Switch to planning mode to explore the codebase, understand dependencies, and design the implementation approach before making changes. ✅**
- B. Start in direct execution mode and switch to planning only after encountering unexpected complexity during implementation.
- C. Start in direct execution mode and make incremental changes, letting implementation reveal natural service boundaries.
- D. Use direct execution with detailed upfront instructions that specify each service structure.

## Question 35 (Q35)

Your team created a `/analyze-codebase` skill that performs deep code analysis--dependency scanning, test coverage counts, and code quality metrics. After running the command, team members report Claude becomes less responsive in the session and loses the context of the original task.

- **A. Add `context: fork` in the skill frontmatter to run the analysis in an isolated subagent context. ✅**
- B. Add `model: haiku` in frontmatter to use a faster, cheaper model for analysis.
- C. Split the skill into three smaller skills, each producing less output.
- D. Add instructions to the skill to compress all results into a short summary before displaying them.

## Question 36 (Q36)

Your team uses a `/commit` skill in `.claude/skills/commit/SKILL.md`. A developer wants to customize it for their personal workflow (different commit message format, extra checks) without affecting teammates.

- A. Create a personal version under `~/.claude/skills/` with a different name, e.g., `/my-commit`.
- B. Add conditional logic based on username in the project skill frontmatter.
- **C. Create a personal version at `~/.claude/skills/commit/SKILL.md` with the same name. ✅**
- D. Set `override: true` in the personal skill frontmatter to prioritize it over the project version.

## Question 37 (Q37)

Your team has used Claude Code for months. Recently, three developers report Claude follows the guidance "always include comprehensive error handling," but a fourth developer who just joined says Claude does not follow it. All four work in the same repo and have up-to-date code.

- **A. The guidance lives in the original developers' user-level `~/.claude/CLAUDE.md` files, not in the project `.claude/CLAUDE.md`. Move the instruction to the project-level file so all team members receive it. ✅**
- B. The new developer's `~/.claude/CLAUDE.md` contains conflicting instructions overriding project settings; they should delete the conflicting section.
- C. Claude Code learns per-user preferences over time; the new developer must repeat the requirement until Claude "remembers" it.
- D. Claude Code caches CLAUDE.md after first read; original developers use cached versions. Everyone should clear the Claude Code cache.

## Question 38 (Q38)

You find that including 2-3 full endpoint implementation examples as context significantly improves consistency when generating new API endpoints. However, this context is useful only when creating new endpoints--not when debugging, reviewing code, or other work in the API directory.

- A. Add endpoint examples and pattern documentation to the project CLAUDE.md so they are always available.
- B. Manually reference endpoint examples in every generation request by copying code into the prompt.
- C. Configure path-specific rules in `.claude/rules/api/` that include endpoint examples and activate when working in the API directory.
- **D. Create a skill that references the endpoint examples and contains pattern-following instructions, invoked on demand via a slash command. ✅**

## Question 39 (Q39)

Your team created a `/migration` skill that generates database migration files. It takes the migration name via `$ARGUMENTS`. In production you observe three issues: (1) developers often run the skill without arguments, causing poorly named files, (2) the skill sometimes uses database schema details from unrelated prior conversations, and (3) a developer accidentally ran destructive test cleanup when the skill had broad tool access.

- A. Use positional parameters `$1` and `$2` instead of `$ARGUMENTS` to enforce specific inputs, include explicit schema file references via `@` syntax for context control, and add a frontmatter description warning about destructive operations.
- **B. Add `argument-hint` in frontmatter to request required parameters, use `context: fork` to isolate execution, and restrict `allowed-tools` to file-write operations. ✅**
- C. Split into `/migration-create` and `/migration-apply` skills, add validation instructions to request migration name if missing, and use different `allowed-tools` scopes for each.
- D. Add validation instructions in the skill SKILL.md to ensure `$ARGUMENTS` is a valid name, add prompts to ignore prior conversation context, and list prohibited operations to avoid.

## Question 40 (Q40)

Your codebase contains areas with different coding conventions: React components use functional style with hooks, API handlers use async/await with specific error handling, and database models follow the repository pattern. Test files are distributed across the codebase next to the code under test (e.g., `Button.test.tsx` next to `Button.tsx`), and you want all tests to follow the same conventions regardless of location.

- A. Put all conventions in the root CLAUDE.md under headings for each area and rely on Claude to infer which section applies.
- B. Create skills in `.claude/skills/` for each code type, embedding conventions in each SKILL.md.
- C. Place a separate CLAUDE.md file in each subdirectory containing conventions for that area.
- **D. Create rule files under `.claude/rules/` with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths. ✅**

## Question 41 (Q41)

You want to create a custom slash command `/review` that runs your team's standard code review checklist. It should be available to every developer when they clone or update the repository.

- A. In `~/.claude/commands/` in each developer's home directory.
- **B. In the project repository under `.claude/commands/`. ✅**
- C. In `.claude/config.json` as an array of commands.
- D. In the root project CLAUDE.md.

## Question 42 (Q42)

Your team's CLAUDE.md grew beyond 500 lines mixing TypeScript conventions, testing guidance, API patterns, and deployment procedures. Developers find it hard to locate and update the right sections.

- A. Define a `.claude/config.yaml` mapping file patterns to specific sections inside CLAUDE.md.
- **B. Create separate Markdown files in `.claude/rules/`, each covering one topic (e.g., `testing.md`, `api-conventions.md`). ✅**
- C. Split instructions into README.md files in relevant subdirectories that Claude automatically loads as instructions.
- D. Create multiple files named CLAUDE.md at different levels of the directory tree, each overriding parent instructions.

## Question 43 (Q43)

You create a custom skill `/explore-alternatives` that your team uses to brainstorm and evaluate implementation approaches before choosing one. Developers report that after running the skill, subsequent Claude responses are influenced by the alternatives discussion--sometimes referencing rejected approaches or retaining exploration context that interferes with actual implementation.

- A. Use the `!` prefix in the skill to run exploration logic as a bash subprocess.
- **B. Add `context: fork` in the skill frontmatter. ✅**
- C. Split into two skills--`/explore-start` and `/explore-end`--to mark boundaries when exploration context should be discarded.
- D. Create the skill in `~/.claude/skills/` instead of `.claude/skills/`.

## Question 44 (Q44)

Your team wants to add a GitHub MCP server for searching PRs and checking CI status via Claude Code. Each of six developers has their own personal GitHub access token. You want consistent tooling across the team without committing credentials to version control.

- A. Have each developer add the server in user scope via `claude mcp add --scope user`.
- B. Create an MCP server wrapper that reads tokens from a `.env` file and proxies GitHub API calls, then add the wrapper to the project `.mcp.json`.
- **C. Add the server to the project `.mcp.json` using environment variable substitution (`${GITHUB_TOKEN}`) for auth and document the required environment variable in the project README. ✅**
- D. Configure the server in project scope with a placeholder token, then tell developers to override it in their local config.

## Question 45 (Q45)

You're adding error-handling wrappers around external API calls across a 120-file codebase. The work has three phases: (1) discover all call sites and patterns, (2) collaboratively design the error-handling approach, and (3) implement wrappers consistently. In Phase 1, Claude generates large output listing hundreds of call sites with context, quickly filling the context window before discovery finishes.

- **A. Use an Explore subagent for Phase 1 to isolate verbose discovery output and return a summary, then continue Phases 2-3 in the main conversation. ✅**
- B. Do all phases in the main conversation, periodically using `/compact` to reduce context usage while moving through files.
- C. Switch to headless mode with `--continue`, passing explicit context summaries between batch calls to maintain continuity.
- D. Define the error-handling pattern in CLAUDE.md, then process files in batches across multiple sessions relying on the shared memory file for consistency.

## Question 46 (Q46)

While testing, you notice the agent often calls `get_customer` when users ask about order status, even though `lookup_order` would be more appropriate. What should you check first to address this problem?

- A. Implement a preprocessing classifier to detect order-related requests and route them directly to `lookup_order`.
- B. Reduce the number of tools available to the agent to simplify choice.
- C. Add few-shot examples to the system prompt covering all possible order request patterns to improve tool selection.
- **D. Check the tool descriptions to ensure they clearly differentiate each tool's purpose. ✅**

## Question 47 (Q47)

Your agent handles single-issue requests with 94% accuracy (e.g., "I need a refund for order #1234"). But when customers include multiple issues in one message (e.g., "I need a refund for order #1234 and also want to update the shipping address for order #5678"), tool selection accuracy drops to 58%. The agent usually solves only one issue or mixes parameters across requests. What approach most effectively improves reliability for multi-issue requests?

- A. Implement a preprocessing layer that uses a separate model call to decompose multi-issue messages into separate requests, handle each independently, and merge results.
- B. Combine related tools into fewer universal tools.
- **C. Add few-shot examples to the prompt demonstrating correct reasoning and tool sequencing for multi-issue requests. ✅**
- D. Implement response validation that detects incomplete answers and automatically reprompts the agent to resolve missed issues.

## Question 48 (Q48)

Production logs show that for simple requests like "refund for order #1234," your agent resolves the issue in 3-4 tool calls with 91% success. But for complex requests like "I was billed twice, my discount didn't apply, and I want to cancel," the agent averages 12+ tool calls with only 54% success--often investigating issues sequentially and fetching redundant customer data for each. What change most effectively improves handling of complex requests?

- A. Add explicit verification checkpoints between stages, requiring the agent to record progress after resolving each issue before moving to the next.
- B. Reduce the number of tools by combining `get_customer`, `lookup_order`, and billing-related tools into a single `investigate_issue` tool.
- **C. Decompose the request into separate issues, then investigate each in parallel using shared customer context before synthesizing a final resolution. ✅**
- D. Add few-shot examples to the system prompt demonstrating ideal tool-call sequences for various multi-faceted billing scenarios.

## Question 49 (Q49)

Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates simple cases (standard replacements for damaged goods with photo proof) while trying to handle complex situations requiring policy exceptions autonomously. What is the most effective way to improve escalation calibration?

- A. Require the agent to self-rate confidence on a 1-10 scale before each response and automatically route to humans when confidence drops below a threshold.
- B. Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent starts processing.
- **C. Add explicit escalation criteria to the system prompt with few-shot examples showing when to escalate versus resolve autonomously. ✅**
- D. Implement sentiment analysis to determine customer frustration level and automatically escalate past a negative sentiment threshold.

## Question 50 (Q50)

After calling `get_customer` and `lookup_order`, the agent has all available system data but still faces uncertainty. Which situation is the most justified trigger for calling `escalate_to_human`?

- A. A customer wants to cancel an order shipped yesterday and arriving tomorrow. The agent should escalate because the customer might change their mind after receiving the package.
- B. A customer claims they didn't receive an order, but tracking shows it was delivered and signed for at their address three days ago. The agent should escalate because presenting contradictory evidence could harm the customer relationship.
- **C. A customer requests competitor price matching. Your policies allow price adjustments for price drops on your own site within 14 days, but say nothing about competitor prices. The agent should escalate for policy interpretation. ✅**
- D. A customer message contains both a billing question and a product return. The agent should escalate so a human can coordinate both issues in one interaction.

## Question 51 (Q51)

Production logs show that in 12% of cases your agent skips `get_customer` and calls `lookup_order` directly using only the customer-provided name, sometimes leading to misidentified accounts and incorrect refunds. What change most effectively fixes this reliability problem?

- A. Add few-shot examples showing that the agent always calls `get_customer` first, even when customers voluntarily provide order details.
- B. Implement a routing classifier that analyzes each request and enables only a subset of tools appropriate for that request type.
- **C. Add a programmatic precondition that blocks `lookup_order` and `process_refund` until `get_customer` returns a verified customer identifier. ✅**
- D. Strengthen the system prompt stating that customer verification via `get_customer` is mandatory before any order operations.

## Question 52 (Q52)

Production metrics show that when resolving complex billing disputes or multi-order returns, customer satisfaction scores are 15% lower than for simple cases--even when the resolution is technically correct. Root-cause analysis shows the agent provides accurate solutions but inconsistently explains rationale: sometimes omitting relevant policy details, sometimes missing timeline info or next steps. The specific context gaps vary case by case. You want to improve solution quality without adding human oversight. What approach is most effective?

- **A. Add a self-critique stage where the agent evaluates a draft response for completeness--ensuring it resolves the customer's issue, includes relevant context, and anticipates follow-up questions. ✅**
- B. Add a confirmation stage where the agent asks "Does this fully resolve your issue?" before closing, allowing customers to request additional information if needed.
- C. Upgrade the model from Haiku to Sonnet for complex cases, routing based on a defined complexity metric.
- D. Implement few-shot examples in the system prompt showing complete explanations for five common complex case types, demonstrating how to include policy context, timelines, and next steps.

## Question 53 (Q53)

Production metrics show your agent averages 4+ API loops per resolution. Analysis reveals Claude often requests `get_customer` and `lookup_order` in separate sequential turns even when both are needed initially. What is the most effective way to reduce the number of loops?

- A. Implement speculative execution that automatically calls likely-needed tools in parallel with any requested tool and returns all results regardless of what was requested.
- B. Increase `max_tokens` to give Claude more room to plan and naturally combine tool requests.
- C. Create composite tools like `get_customer_with_orders` that bundle common lookup combinations into single calls.
- **D. Instruct Claude in the prompt to bundle tool requests into one turn and return all results together before the next API call. ✅**

## Question 54 (Q54)

Production logs show a pattern: customers reference specific amounts (e.g., "the 15% discount I mentioned"), but the agent responds with incorrect values. Investigation shows these details were mentioned 20+ turns ago and condensed into vague summaries like "promotional pricing was discussed." What fix is most effective?

- A. Increase the summarization threshold from 70% to 85% so conversations have more room before summarization triggers.
- B. Store full conversation history in external storage and implement retrieval when the agent detects references like "as I mentioned."
- **C. Extract transactional facts (amounts, dates, order numbers) into a persistent "case facts" block included in every prompt outside the summarized history. ✅**
- D. Revise the summarization prompt to explicitly preserve all numbers, percentages, dates, and customer-stated expectations verbatim.

## Question 55 (Q55)

Your `get_customer` tool returns all matches when searching by name. Currently, when there are multiple results, Claude picks the customer with the most recent order, but production data shows this selects the wrong account 15% of the time for ambiguous matches. How should you address this?

- A. Implement a confidence scoring system that acts autonomously above 85% confidence and requests clarification below the threshold.
- **B. Instruct Claude to request an additional identifier (email, phone, or order number) when `get_customer` returns multiple matches before taking any customer-specific action. ✅**
- C. Modify `get_customer` to return only a single most-likely match based on a ranking algorithm, eliminating ambiguity.
- D. Add few-shot examples to the prompt demonstrating correct reasoning and tool sequencing for ambiguous matches.

## Question 56 (Q56)

Production logs show a consistent pattern: when customers include the word "account" in their message (e.g., "I want to check my account for an order I made yesterday"), the agent calls `get_customer` first 78% of the time. When customers phrase similar requests without "account" (e.g., "I want to check an order I made yesterday"), it calls `lookup_order` first 93% of the time. Tool descriptions are clear and unambiguous. What is the most likely root cause of this discrepancy?

- **A. The system prompt contains keyword-sensitive instructions that steer behavior based on terms like "account," creating unintended tool-selection patterns. ✅**
- B. The model's base training creates associations between "account" terminology and customer-related operations that override tool descriptions.
- C. The model needs more training data on multi-concept messages and should be fine-tuned on examples containing both account and order terminology.
- D. Tool descriptions need additional negative examples specifying when NOT to use each tool to prevent this keyword-induced confusion.

## Question 57 (Q57)

Production logs show the agent often calls `get_customer` when users ask about orders (e.g., "check my order #12345") instead of calling `lookup_order`. Both tools have minimal descriptions ("Gets customer information" / "Gets order details") and accept similar-looking identifier formats. What is the most effective first step to improve tool selection reliability?

- A. Implement a routing layer that analyzes user input before each turn and preselects the correct tool based on detected keywords and ID patterns.
- B. Combine both tools into a single `lookup_entity` that accepts any identifier and internally decides which backend to query.
- C. Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5-8 examples routing order-related queries to `lookup_order`.
- **D. Expand each tool's description to include input formats, example queries, edge cases, and boundaries explaining when to use it versus similar tools. ✅**

## Question 58 (Q58)

You are implementing the agent loop for your support agent. After each Claude API call, you must decide whether to continue the loop (run requested tools and call Claude again) or stop (present the final answer to the customer). What determines this decision?

- **A. Check the `stop_reason` field in Claude's response--continue if it is `tool_use` and stop if it is `end_turn`. ✅**
- B. Parse Claude's text for phrases like "I'm done" or "Can I help with anything else?"--natural language signals indicate task completion.
- C. Set a maximum iteration count (e.g., 10 calls) and stop when reached, regardless of whether Claude indicates more work is needed.
- D. Check whether the response contains assistant text content--if Claude generated explanatory text, the loop should terminate.

## Question 59 (Q59)

Production logs show the agent misinterprets outputs from your MCP tools: Unix timestamps from `get_customer`, ISO 8601 dates from `lookup_order`, and numeric status codes (1=pending, 2=shipped). Some tools are third-party MCP servers you cannot modify. Which approach to data format normalization is most maintainable?

- **A. Use a PostToolUse hook to intercept tool outputs and apply formatting transformations before the agent processes them. ✅**
- B. Modify tools you control to return human-readable formats and create wrappers for third-party tools.
- C. Create a `normalize_data` tool that the agent calls after every data retrieval to transform values.
- D. Add detailed format documentation to the system prompt explaining each tool's data conventions.

## Question 60 (Q60)

Production logs show the agent sometimes chooses `get_customer` when `lookup_order` would be more appropriate, especially for ambiguous queries like "I need help with my recent purchase." You decide to add few-shot examples to the system prompt to improve tool selection. Which approach most effectively addresses the problem?

- A. Add explicit "use when" and "don't use when" guidance in each tool description covering ambiguous cases.
- B. Add examples grouped by tool--all `get_customer` scenarios together, then all `lookup_order` scenarios.
- **C. Add 4-6 examples targeted at ambiguous scenarios, each with rationale for why one tool was chosen over plausible alternatives. ✅**
- D. Add 10-15 examples of clear, unambiguous requests demonstrating correct tool choice for typical scenarios for each tool.
