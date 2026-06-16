# Claude Certified Architect - Questions and Correct Answers

## Question 1 (Q41676)

A team has a custom tool `/deploy-cloud` that requires a `region` parameter. The tool occasionally infers the region from previous, unrelated parts of the conversation, causing deployments to the wrong environment. According to Anthropic's recommended practices, what is the most effective way to ensure the tool operates with a clean context, free from the main chat history, to reliably gather the required parameters?

- A. Add `context: fork` to the tool's configuration so that it launches in a completely separate context, preventing any leakage of the main conversation history into the deployment decision.
- **B. Refactor the deployment logic into a specialized sub-agent. The main agent can then invoke this sub-agent, which operates with its own clean context window to handle the deployment task. ✅**
- C. Use a context engineering technique like compaction to summarize the chat history before the tool is called, stripping out unrelated turns so that only the deployment-relevant details remain.
- D. Add a more explicit instruction in the tool's prompt, such as: 'CRITICAL: You MUST ignore all previous conversation history and ask for the region.' Include a step that resets the context before the tool runs.

## Question 2 (Q41449)

An incident response system uses a coordinator to investigate server outages. When an outage occurs, the coordinator gathers initial logs. It then needs to investigate two competing hypotheses: a DDoS attack and a database failure. If it investigates the DDoS attack first and finds nothing, the context window is now polluted with irrelevant network logs, confusing the model when it subsequently investigates the database failure. How can the architect use fork-based session management to solve this context pollution problem?

- **A. Branch the session state immediately after the initial log gathering, creating two isolated threads that each receive a copy of the initial logs and investigate one hypothesis independently. ✅**
- B. Configure the coordinator to emit two Task tool calls in parallel, ensuring the network logs and database logs are processed by separate subagents before merging the results.
- C. Instruct the coordinator to output its findings in a structured JSON format, separating the DDoS logs from the database logs, to preserve attribution in a single thread.
- D. Update the `AgentDefinition` for the subagents to include a `ClearContext` tool, allowing them to wipe the session memory before switching hypotheses, so that each investigation starts with a clean context.

## Question 3 (Q39916)

A sentiment analysis application processes customer reviews. Users can flag incorrect sentiment classifications. The team notices that reviews containing the phrase 'wicked good' are often classified as 'Negative' by the model but are flagged as 'Positive' by users from New England. How should the feedback from these user corrections be used to improve the model's performance?

- A. Implement a hard-coded preprocessing rule that replaces the phrase 'wicked good' with 'very good' in all incoming reviews before they reach the sentiment model, ensuring the model always classifies based on the substituted phrase.
- **B. Collect examples of user-corrected reviews containing 'wicked good' and incorporate them as few-shot examples in the prompt to provide the model with contextual understanding of this regional slang. ✅**
- C. Fine-tune the base sentiment model on a curated dataset of New England regional texts, including novels, local news articles, and social media posts, to help it learn that 'wicked' can intensify positive adjectives in colloquial usage.
- D. Add a prompt instruction that directs the model to treat negative-sounding words as positive when they appear in regional slang combinations, such as interpreting 'wicked' as an intensifier in 'wicked good' for New England dialects.

## Question 4 (Q40070)

A dynamic pricing engine analyzes competitor websites to adjust product prices. 95% of the catalog consists of standard items updated weekly, but 5% are 'flash sale' items that require price adjustments within 5 minutes of a competitor's change. How should the architect design the Claude integration to optimize costs while strictly meeting business requirements?

- **A. Route weekly updates to the Message Batches API for cost savings and flash sale updates to the synchronous Messages API to meet the 5-minute latency requirement. ✅**
- B. Route all updates to the Message Batches API for simplicity, placing flash sale items in a separate batch with a `priority: critical` flag to ensure they bypass the queue.
- C. Route all updates to the synchronous Messages API to maintain a single, low-latency paradigm, avoiding the complexity and overhead of managing two separate integrations.
- D. Route weekly updates to the synchronous Messages API during off-peak hours to simulate batching, and use the Message Batches API for high-volume flash sale adjustments.

## Question 5 (Q41665)

A systems programming team is building a custom memory allocator in C++ for a real-time gaming engine using Claude. The allocator must handle specific fragmentation scenarios and strict 16-byte alignment requirements. Which workflow best applies test-driven iteration to ensure the allocator meets these strict requirements?

- A. Ask Claude to write the allocator with inline assertions on every pointer arithmetic operation to verify 16-byte alignment at runtime, ensuring each allocation returns a correctly aligned address before use.
- B. Prompt Claude to generate the allocator code and a mathematical proof of its fragmentation resistance in a single response to ensure correctness, verifying that the buddy system maintains minimal external fragmentation.
- C. Have Claude write the allocator, manually integrate it into the game engine's rendering loop, and report any runtime crashes back to Claude for iterative fixes based on crash logs and memory dumps.
- **D. Develop a comprehensive test suite covering alignment edge cases and fragmentation first, run it against Claude's generated allocator, and iteratively feed the memory leak reports back to Claude. ✅**

## Question 6 (Q24233)

A developer spent Tuesday documenting half of an API using an agentic workflow. They plan to finish the second half on Wednesday. Which session management strategy is most efficient for continuing the task, assuming the codebase hasn't changed?

- A. Start a fresh session on Wednesday with a structured summary of what was documented so far, to avoid context window limits.
- **B. Use --resume to continue the session on Wednesday, because the prior context is entirely valid and no tool results have become stale. ✅**
- C. Use fork_session on Wednesday to create a parallel branch for the second half of the documentation.
- D. Start a new session and re-upload the entire API codebase, asking Claude to identify what is missing from the previous day's work.

## Question 7 (Q40133)

A data extraction system uses Claude to generate complex Regular Expressions (Regex) for parsing proprietary log formats. The prompt uses extended thinking to allow Claude to plan the regex step-by-step. However, the generated regex often fails on edge cases. The team adds a self-correction prompt in the same session, but Claude usually just tweaks the regex slightly while maintaining the flawed core logic. Which architectural change will most effectively improve the regex validation process?

- **A. Extract the final regex and pass it to a second, independent Claude instance along with the edge cases, omitting the step-by-step reasoning from the first instance. ✅**
- B. Implement a multi-pass review where the regex is split into individual capture groups, and each group is reviewed in a separate local pass to verify its pattern against sample log fragments.
- C. Require the model to output a confidence score alongside the regex, and automatically trigger a self-correction loop only if the confidence is below 90%.
- D. Increase the temperature of the self-correction prompt to force the model to abandon its original logic and explore completely different regex patterns.

## Question 8 (Q40014)

Claude has generated a complex SQL query for a data analyst: `WITH raw_data AS (   SELECT id, val FROM table1 JOIN table2 ON table1.id = table2.id ) SELECT AVG(val) FROM raw_data;` The analyst notices that the `JOIN` in the CTE creates duplicate rows, which in turn causes the final `AVG(val)` aggregation to be mathematically incorrect. How should the analyst prompt Claude to fix this?

- A. Tell Claude to first eliminate the duplicate rows in the CTE by adding a DISTINCT or GROUP BY, and then separately adjust the AVG aggregation to compute the correct mean.
- **B. Provide a single prompt explaining that the duplicate rows in the CTE are causing the final aggregation to calculate the average incorrectly, asking for a comprehensive fix. ✅**
- C. Ask Claude to materialize the CTE into a temporary table, deduplicate the rows with a row-number window function, and then recompute the average from the cleaned dataset.
- D. Provide the correct average numerical value to Claude and ask it to iteratively modify the query until the output matches that number, using the value as a target for validation.

## Question 9 (Q41509)

An onboarding agent currently uses a strict application-side decision tree: `CreateAccount` -> `AssignRole` -> `SendWelcomeEmail`. The business wants the agent to skip `AssignRole` if the user is a guest, and handle unexpected API errors dynamically. How should the architect modify the system?

- A. Keep the decision tree but add conditional logic in the application code to check the user type before calling `AssignRole`, and include a retry mechanism for unexpected API errors.
- **B. Provide all three tools to Claude, remove the application-side sequence logic, and implement a standard agentic loop relying on Claude's reasoning to determine the execution order. ✅**
- C. Create a single `OnboardUser` tool that executes the entire sequence on the backend, with internal branching to skip role assignment for guest users and handle API errors by retrying failed calls.
- D. Use `tool_choice` to force `CreateAccount`, then use a secondary LLM to evaluate if `AssignRole` is needed before continuing the sequence, and implement error handling for API failures.

## Question 10 (Q24221)

A healthcare company needs to extract structured patient data from 2 million historical medical records. They plan to use the Message Batches API to save costs. To minimize the risk of iterative resubmission costs due to parsing errors or hallucinations, what step should the architect mandate before processing the full dataset?

- A. Submit the entire dataset in a single batch to leverage economies of scale and minimize API overhead.
- **B. Run a representative sample set through the synchronous API to refine the prompt and validate the structured output format. ✅**
- C. Split the 2 million records into 100 smaller batches and submit them concurrently to bypass the 24-hour processing window.
- D. Use the lowest-cost model for the first pass and only use a more capable model for the requests that fail validation.

## Question 11 (Q39895)

A fintech company uses Claude to audit expense reports. The prompt instructs Claude to 'Flag any suspicious or unusual expenses for manual review.' Claude is flagging perfectly normal recurring software subscriptions because the amounts vary slightly each month due to usage tiers. Which prompt modification is the most effective way to reduce these false positives?

- **A. Update the prompt to: 'Only flag expenses if they violate specific categorical criteria, such as exceeding $500 per transaction, occurring on weekends, or belonging to non-approved vendor categories.' ✅**
- B. Change the prompt to: 'Only report high-confidence suspicious findings and be conservative with software subscriptions, such as flagging only expenses that deviate more than 50% from the monthly average or lack a recurring vendor pattern.'
- C. Instruct Claude to assign an 'Anomaly Score' from 1-10 and only flag expenses that score an 8 or higher. Each ingestion run should store collection timestamps so the synthesis step can treat cross-week text changes as amendments.
- D. Add a rule: 'Ignore all software subscriptions unless you are absolutely certain they are fraudulent, such as when the vendor name does not match any known subscription service or the charge appears on an unexpected date.'

## Question 12 (Q24147)

A multi-agent system features a Researcher agent with 10 deep-dive search tools and a Writer agent with 2 formatting tools. The Writer agent frequently encounters minor factual gaps (e.g., needing to verify a specific date) while drafting. Currently, the Writer must yield back to the Coordinator, which calls the Researcher, adding 3-4 extra turns and increasing latency. How should the architect optimize this workflow?

- A. Merge the Researcher and Writer agents into a single agent with all 12 tools to eliminate routing latency entirely.
- **B. Provide the Writer agent with a scoped verify_fact tool for high-frequency minor lookups, while routing complex research back to the Coordinator. ✅**
- C. Force the Writer agent to use tool_choice: {"type": "any"} to ensure it resolves all factual gaps before generating any text.
- D. Give the Writer agent the full suite of 10 research tools but use system prompts to restrict their usage to minor factual lookups.

## Question 13 (Q39965)

A DevOps assistant has tools for `restart_server`, `view_logs`, and `escalate_incident`. The system prompt states: 'If a user reports a server crash, you must immediately escalate the incident.' A user says, 'The web server crashed, but I just want to view the logs to see why before we wake anyone up.' Claude ignores the user's request and calls `escalate_incident`. How should the architect resolve this conflict?

- A. Delete the `escalate_incident` tool from the assistant's available functions to force the model to select `view_logs` when a user reports a crash and requests a diagnostic action.
- B. Update the `view_logs` tool's description to instruct the model that it is the required first step for server crash reports, giving it precedence over the system prompt's rule.
- **C. Review and revise the system prompt to remove the rigid, keyword-sensitive instruction that overrides the user's specific request and tool descriptions. ✅**
- D. Change the user interface to replace natural language input with buttons for `view_logs` and `restart_server` to prevent user requests from triggering the strict escalation rule.

## Question 14 (Q32941)

A team is migrating their local Claude Code usage to an automated GitHub Actions workflow. Locally, developers rely on interactive prompts to guide Claude in applying the correct architectural patterns during code generation. In CI, the workflow must run unattended and automatically apply these patterns without hanging the pipeline.  Which combination of configurations is required to achieve this?

- A. Run Claude Code with the `--auto-approve` flag to bypass interactive prompts, and use the `--pattern-file` flag to inject the architectural guidelines.
- **B. Run Claude Code with the `-p` flag to enforce non-interactive execution, and document the required architectural patterns in the `CLAUDE.md` file to provide the necessary context automatically. ✅**
- C. Run Claude Code with the `--background` flag to prevent pipeline stalls, and set the `CLAUDE_ARCHITECTURE` environment variable to define the patterns.
- D. Run Claude Code with the `--batch` flag for unattended execution, and use the `/architect` slash command within the prompt to enforce the patterns.

## Question 15 (Q39957)

A technical support bot uses a Coordinator to dynamically select between a `DocsRetrievalAgent` (cheap, fast) and a `CodeAnalysisAgent` (expensive, slow). If a user asks, "How do I configure the database?", the Coordinator routes the query to the `DocsRetrievalAgent`. However, if the user's actual problem is a subtle syntax error in their config file that the documentation does not cover, the `DocsRetrievalAgent` simply repeats the documentation, leaving the user frustrated. How should the Coordinator's orchestration logic be improved to handle cases where the initial query complexity is deceptively low?

- A. Redesign the Coordinator to always invoke both the `DocsRetrievalAgent` and the `CodeAnalysisAgent` in parallel for every query, merging their outputs into a single comprehensive response that covers both documentation and detailed code-level analysis.
- B. Configure the `DocsRetrievalAgent` to automatically forward the user's full conversation history and any attached config files to the `CodeAnalysisAgent` via a direct API call if its own confidence score for a response is below a predefined threshold.
- C. Update the Coordinator's initial routing prompt with a strict keyword-based rule set. This logic would assume all queries containing terms like 'database', 'config', or 'connection' are highly complex and default them directly to the `CodeAnalysisAgent`.
- **D. Implement an iterative evaluation loop where the Coordinator reviews the DocsRetrievalAgent's success based on user feedback or resolution status, and dynamically escalates to the CodeAnalysisAgent if the issue remains unresolved. ✅**

## Question 16 (Q39933)

An SRE team uses Claude to automatically triage PagerDuty alerts and assign a severity level (SEV-1, SEV-2, SEV-3). Claude is inconsistently assigning SEV-1 (Critical) to single-node CPU spikes that auto-resolve within minutes. The current prompt defines SEV-1 as 'Critical infrastructure degradation.' How should the architect modify the prompt to achieve consistent classification?

- A. Instruct Claude to classify a CPU spike as SEV-1 only when it affects multiple nodes simultaneously and persists for more than ten minutes, while single-node spikes that resolve within five minutes must be assigned SEV-3.
- **B. Define explicit severity criteria in the prompt, including concrete metric thresholds and examples, such as 'SEV-1: >10% global error rate or complete database outage. SEV-3: Single-node CPU spike.' ✅**
- C. Ask Claude to output a confidence score for its severity assignment and downgrade SEV-1 to SEV-2 if confidence is below 95%. Include a rule that any alert with a confidence score under 80% defaults to SEV-3.
- D. Add a prompt instruction: 'Be extremely conservative when assigning SEV-1 and default to SEV-3 for any performance-related alerts.' Also specify that SEV-1 requires confirmation from a second Claude call before finalizing.

## Question 17 (Q33069)

An infrastructure management agent uses a generic `manage_aws_resource` tool. To prevent destructive actions, the developer implemented a complex 500-line JSON schema with strict `enum` validations, conditional dependencies, and nested objects. The agent now frequently fails to construct valid JSON payloads, resulting in API errors. What is the recommended architectural alternative?

- A. Keep the generic tool but set `tool_choice: {"type": "tool", "name": "manage_aws_resource"}` to force the model to focus its entire context window on schema generation.
- **B. Replace the single generic tool with 4-5 constrained, purpose-built tools (e.g., `restart_ec2`, `scale_asg`) that utilize simple, flat JSON schemas. ✅**
- C. Distribute the generic tool across multiple subagents, giving each subagent the exact same tool but providing different few-shot examples in their system prompts.
- D. Increase the model's temperature to allow it to creatively bypass the strict `enum` validations when generating the complex schema.

## Question 18 (Q24283)

A frontend architect needs to analyze all end-to-end test files to evaluate a migration from Cypress to Playwright. The test files are distributed across dozens of nested feature directories but all share the `.cy.ts` extension. What is the most effective way to locate these files?

- A. Use Grep with the search pattern `describe(` to find all test files, then filter the results manually.
- **B. Use Glob with the pattern `**/*.cy.ts` to efficiently match and return the specific file paths. ✅**
- C. Use Read on the root directory to recursively list all files and parse the output for the extension.
- D. Use the Edit tool to temporarily rename all `.cy.ts` files to a single directory for easier analysis.

## Question 19 (Q23983)

A healthcare platform processes standard patient intake forms to extract demographic data, and then investigates complex, open-ended medical histories to suggest potential clinical trials. The engineering team needs to design the orchestration layer for these two distinct tasks. Which combination of decomposition patterns is most appropriate?

- A. Dynamic adaptive decomposition for both the intake forms and the clinical trial investigation.
- B. Fixed sequential pipeline for both the intake forms and the clinical trial investigation.
- C. Dynamic adaptive decomposition for the intake forms, and a fixed sequential pipeline for the clinical trial investigation.
- **D. A fixed sequential pipeline for the intake forms, and dynamic adaptive decomposition for the clinical trial investigation. ✅**

## Question 20 (Q24077)

An e-commerce routing agent powered by Claude must select between two tools: `process_return` and `escalate_to_human`. While the system prompt contains detailed instructions, Claude frequently makes incorrect tool selections when handling ambiguous customer requests, such as 'I want to return this but it arrived completely shattered and caused damage to my floor.' Which approach is the most effective way to improve Claude's tool selection for these edge cases?

- A. Add a strict negative prompt instructing Claude not to use `process_return` if the word 'damage' is present in the user's request.
- **B. Provide 2-4 targeted few-shot examples of ambiguous scenarios that explicitly show the reasoning for why one tool was chosen over plausible alternatives. ✅**
- C. Lower the temperature parameter to 0.0 to ensure deterministic tool selection based strictly on the existing system instructions.
- D. Implement a chain-of-thought prompt that asks Claude to list all possible tools before making a final selection, without providing examples.

## Question 21 (Q24013)

A data engineer is using Claude to parse a complex, legacy proprietary log format into structured JSON. The engineer has written a detailed three-paragraph prompt explaining the extraction rules, delimiters, and edge cases in natural language. However, Claude consistently misinterprets how to handle nested brackets within the log strings. Which approach should the engineer take to most effectively correct Claude's transformation logic?

- A. Rewrite the natural language prompt using more precise academic terminology regarding parsing algorithms and abstract syntax trees.
- **B. Provide 2-3 concrete examples of the raw log lines alongside their exact expected JSON outputs to clarify the transformation requirements. ✅**
- C. Ask Claude to generate a Python script that uses regular expressions, then manually debug the regex until it works.
- D. Break the prompt into ten sequential steps, asking Claude to confirm understanding after each natural language instruction.

## Question 22 (Q24032)

A data extraction agent is parsing a 100-page PDF contract. It successfully extracts clauses from pages 1-80 but encounters a corrupted image on page 81 that crashes the OCR engine, making the rest of the document unreadable. What is the most appropriate way for the subagent to handle this failure?

- A. Discard all extracted data and return a generic 'PDF Parsing Error' to the coordinator.
- **B. Return the extracted clauses from pages 1-80 within a structured error payload, noting the failure type and the exact page where the OCR failed. ✅**
- C. Return the clauses from pages 1-80 as a complete success, silently ignoring the remaining pages to ensure the workflow completes.
- D. Terminate the workflow immediately and prompt the user to upload a perfectly formatted document.

## Question 23 (Q41500)

A travel booking multi-agent system coordinates flights, hotels, and rental cars. During a complex booking, the rental car API returns a permanent 404 error for the requested destination city. Which action should the rental car subagent take?

- A. Terminate the entire booking workflow immediately and notify the coordinator that the rental car destination is unavailable, preventing the user from being stranded without a car.
- B. Return a successful response with a dummy car booking that includes a placeholder reservation ID and confirmation, allowing the flight and hotel bookings to complete without interruption.
- **C. Return a structured error with the failure type and attempted query, allowing the coordinator to proceed with flights and hotels while suggesting alternative ground transport. ✅**
- D. Continuously retry the 404 endpoint using exponential backoff with a maximum retry limit, expecting the rental car API to eventually add inventory for that city after a temporary outage resolves.

## Question 24 (Q24217)

A financial firm receives a continuous stream of transaction logs. Regulatory compliance dictates a strict 30-hour SLA for generating fraud analysis reports from the exact time a log is generated. Given that the Message Batches API has up to a 24-hour processing window, what is the most efficient batch submission strategy that guarantees compliance while maximizing batch sizes?

- A. Submit a new batch every 24 hours.
- **B. Submit a new batch every 6 hours. ✅**
- C. Submit a new batch every 12 hours.
- D. Submit a new batch every 30 hours.

## Question 25 (Q40004)

A data science agent uses a generic `analyze_dataset` tool. Users ask it to perform tasks ranging from simple row counts to complex anomaly detection. The tool frequently times out on complex requests because the backend tries to run a massive, monolithic analysis script every time. Which tool design strategy should be applied?

- A. Increase the API timeout threshold to 5 minutes so the monolithic script can complete iterative anomaly detection passes over large datasets without interruption.
- **B. Split the generic tool into purpose-specific tools like `get_row_count`, `generate_statistical_summary`, and `detect_anomalies` with defined input/output contracts. ✅**
- C. Instruct Claude in the system prompt to notify users that complex queries such as anomaly detection may require extended processing time before results are returned.
- D. Add a `complexity_score` parameter to the `analyze_dataset` tool that estimates compute needs based on task type, such as row counts versus anomaly detection, to guide backend resource allocation.

## Question 26 (Q24241)

You are architecting a large monorepo with 40 distinct microservices. Each microservice has its own tests/ directory. You need Claude to follow a strict mocking convention whenever it edits any test file across the entire repository. You want to minimize maintenance overhead and avoid duplicating instructions. Which approach should you implement?

- **A. Create a .claude/rules/testing.md file with YAML frontmatter paths: ["**/tests/**/*"]. ✅**
- B. Create a CLAUDE.md file in the root directory and use markdown headers to specify the **/tests/**/* path.
- C. Write a CI/CD script to automatically generate and sync a CLAUDE.md file into each of the 40 tests/ directories.
- D. Add the testing conventions to the root CLAUDE.md file and instruct Claude in plain text to only read them when editing test files.

## Question 27 (Q42979)

An e-commerce company has a mature, Claude-based system for extracting product details from supplier catalogs. Recently, a major supplier changed their catalog format without notice, introducing a new 'sustainability score' field and altering the date format, causing subtle, undetected errors. Which existing workflow component, if designed correctly, would be most effective at detecting this new error pattern quickly?

- A. The initial data validation pipeline checks for required fields based on the old format, flagging any catalog that omits expected keys or uses unrecognized date patterns.
- B. An anomaly detection model that monitors confidence scores and alerts when a supplier's mean score deviates significantly from its established historical baseline.
- **C. An ongoing, stratified random sampling of extractions, where reviewers compare the model's output against the source document, with sampling strata that include both high- and low-confidence outputs and known edge cases. ✅**
- D. A daily report of the aggregate accuracy metric for all processed catalogs, computed by comparing a fixed set of benchmark extractions against known ground-truth values.

## Question 28 (Q40072)

A legacy codebase is being migrated, and Claude is tasked with reviewing the new code. The prompt asks Claude to 'Find all issues in the code.' The output is flooded with minor formatting inconsistencies and local naming pattern deviations, burying actual logic bugs. Which prompt update will best resolve this issue?

- A. Update the prompt to: 'Only report high-confidence findings. Be conservative with style issues, flagging only those that harm readability while ignoring local naming conventions.'
- **B. Update the prompt to: 'Report only logic bugs and security vulnerabilities. Explicitly skip minor style issues, formatting, and local naming conventions.' ✅**
- C. Use a post-processing script to filter Claude's output. The script should parse the response and discard any reported issue that contains the keywords 'style', 'formatting'.
- D. Ask Claude to categorize all findings by severity (critical, major, minor) and then output only the top three most important issues identified for each reviewed code file.

## Question 29 (Q40159)

An enterprise AI assistant has access to 18 different tools ranging from calendar management to database querying. Users report that the assistant frequently hallucinates tool arguments or selects the wrong tool entirely when given complex, multi-part requests. What is the primary cause of this behavior and the recommended architectural solution?

- A. The context window is overflowing with 18 detailed tool descriptions; the recommended solution is to compress all tool schemas and descriptions using abbreviations.
- B. The model lacks sufficient training data for 18 distinct tools; the solution is to perform supervised fine-tuning on a dataset of successful tool-use examples.
- **C. Giving an agent too many tools degrades selection reliability; the solution is to distribute the tools across specialized subagents with 4-5 tools each. ✅**
- D. The `tool_choice` parameter is set to `{"type": "auto"}`; the solution is to change it to `{"type": "any"}` to force the model to select a tool for every user request.

## Question 30 (Q24289)

A security patch requires changing the signature of the `verifyToken(token)` function to `verifyToken(token, options)`. The function is used extensively across a large monolithic backend. What is the most efficient way to locate every file that needs to be updated?

- A. Use Glob to find all .js and .ts files, then Read each one sequentially to check for the function invocation.
- **B. Use Grep with the pattern verifyToken( to search the file contents and identify all caller files and their contexts. ✅**
- C. Use the Edit tool with a wildcard pattern verifyToken(*) to automatically update all signatures in one pass.
- D. Use the Bash tool to run the test suite and only modify the files that throw compilation errors regarding verifyToken.

## Question 31 (Q23984)

An architecture review agent is analyzing a 100-page technical specification. It must verify security compliance, performance requirements, and data model consistency. Currently, the agent is instructed to check all three domains in a single pass, but it frequently misses critical security flaws due to attention dilution. How should the architect restructure the workflow?

- **A. Implement a fixed prompt chain that performs three separate sequential passes over the document, one dedicated to each specific domain. ✅**
- B. Use dynamic decomposition to allow the agent to decide which pages are most relevant for security, performance, and data.
- C. Compress the document using a summarization agent before performing the three-domain review.
- D. Increase the context window size and use a more complex system prompt with strict XML formatting.

## Question 32 (Q42977)

A `Support_Agent` frequently needs to check user account balances to answer basic inquiries. The architect provides a scoped `get_balance` tool to the `Support_Agent` to reduce routing latency. However, the `Billing_Agent` (which handles actual transactions) maintains a separate, highly dynamic session state. When the `Support_Agent` reads the balance, it sometimes retrieves stale data if a transaction is mid-flight. How should the architect resolve this cross-role data consistency issue?

- A. Set `tool_choice: {"type": "any"}` on the `Support_Agent` to force repeated `get_balance` calls until the read matches the last known committed state from the `Billing_Agent`.
- B. Give the `Support_Agent` the full suite of transaction tools so it can acquire an exclusive lock on the account row before reading the balance, blocking concurrent writes from the `Billing_Agent`.
- **C. Remove the scoped `get_balance` tool from the `Support_Agent` and route all balance inquiries through the Coordinator to the `Billing_Agent` to ensure a single source of truth. ✅**
- D. Merge the `Support_Agent` and `Billing_Agent` into a single monolithic agent with 25 tools that shares the session state natively, so balance reads always reflect the latest in-memory state.

## Question 33 (Q41510)

An IT helpdesk bot attempts to resolve hardware issues but frequently fails and escalates to human Tier 2 support. The human agents complain that escalations lack context, forcing them to start troubleshooting from scratch. What is the best architectural pattern to resolve this?

- A. Configure the orchestration layer to automatically append the last 5 user messages and the bot's diagnostic steps to the escalation ticket, giving Tier 2 agents a chronological interaction log.
- **B. Implement a pre-escalation step where Claude calls an escalate_ticket tool requiring fields for root cause analysis, steps attempted, and recommended next actions. ✅**
- C. Prompt the bot to ask the user to summarize their issue in one sentence and include that summary in the escalation webhook payload, providing Tier 2 agents with a concise problem statement.
- D. Switch the architecture to a human-in-the-loop (HITL) model where a human approves every tool call the bot makes before escalation, allowing Tier 2 agents to review each diagnostic action.

## Question 34 (Q39981)

A company is using an Anthropic model to automate the initial categorization of customer support tickets. The business has identified that misclassifying a high-priority 'Urgent' ticket is significantly more costly than having a human review a ticket. Given the capabilities of Anthropic's models and the high stakes involved, what is the most effective and reliable methodology for the architect to implement?

- A. Fully automate the categorization for all tickets by deploying the model to classify every incoming request without human intervention, and schedule a monthly review of overall accuracy metrics to detect any drift in performance. This approach maximizes throughput by eliminating manual review steps entirely.
- B. Iterate through different confidence thresholds on a validation set, calculate a total cost for each threshold based on the cost of review versus misclassification, and select the threshold that minimizes this total cost for the production pipeline. This process involves systematically varying the model's confidence cutoff.
- C. Fine-tune a model on the validation set with the sole objective of maximizing the F1-score for the 'Urgent' category, then deploy the fine-tuned model to handle all ticket classification automatically without any human review step. This strategy focuses on improving the model's precision and recall for urgent tickets.
- **D. Implement a human-in-the-loop (HITL) workflow where the model performs an initial classification. Design a prompt that instructs the model to flag any potentially 'Urgent' tickets for mandatory human review, ensuring no high-priority ticket is actioned without validation. ✅**

## Question 35 (Q42920)

A project has strict logging requirements defined in `CLAUDE.md` stating: "All new functions must include a debug log". A developer creates a custom skill `/quick-script` in `~/.claude/skills/` to generate throwaway data parsing scripts. They notice that Claude is still adding debug logs to these throwaway scripts, wasting tokens. Why is this happening?

- **A. `CLAUDE.md` is an always-loaded project standard whose instructions are included in the context even when invoking custom skills. ✅**
- B. User-scoped skills in `~/.claude/skills/` automatically inherit project-level configurations like `CLAUDE.md`, applying their rules during execution.
- C. The developer forgot to add `ignore-global: true` to the `/quick-script` skill's frontmatter, the setting needed to override project-level configuration rules.
- D. The Claude Code CLI prioritizes project-level configurations like `CLAUDE.md` over user-level skills, ensuring that its logging requirements are always enforced.

## Question 36 (Q41475)

A senior developer uses a niche, personal time-tracking CLI application that is installed locally on their machine. They want Claude Code to automatically log their coding activities to this application. The developer works across five different company repositories, none of which use this time-tracking software. Where is the most appropriate place to configure this MCP server?

- A. In the .mcp.json file of the most frequently used company repository.
- B. In a global /etc/mcp/config.json file to ensure system-wide availability.
- **C. In the developer's user-scoped ~/.claude.json file. ✅**
- D. In a dedicated time-tracking repository, requiring the developer to symlink the .mcp.json to their active projects.

## Question 37 (Q40057)

A development team is building an AI tool to document undocumented legacy systems. The tool needs to explore the codebase, discover domain-specific terminology, and then write a comprehensive glossary. They are deciding how to manage context during this highly verbose process. Which architectural approach best utilizes Anthropic's recommended patterns?

- **A. Use subagents to isolate verbose exploration of directories. The main agent maintains a scratchpad file to persist discovered terminology across the entire session. ✅**
- B. Use a scratchpad file to isolate verbose output from exploration tools like `find`. Subagents then parse this file to persist key terminology across context boundaries.
- C. Rely entirely on structured state persistence manifests to build the glossary. The agent appends discovered terms directly to a manifest, avoiding the overhead of scratchpads or subagents.
- D. Use the `/compact` command exclusively after every file read to manage the verbose output from the codebase. This command automatically summarizes the context.

## Question 38 (Q33051)

An enterprise architect uses Claude to perform a comprehensive compliance audit of a legacy system. After 40 turns of deep analysis, Claude has built a highly accurate mental model of the system's data flows and security boundaries. The architect must now produce three distinct deliverables: a highly technical remediation guide for developers, a high-level risk summary for the board, and a formatted SOC2 compliance matrix. How should the architect generate these deliverables to ensure the tone and specific requirements of one document do not negatively influence the others?

- **A. Use fork_session three times from the completed analysis baseline, generating each specific deliverable in its own independent branch. ✅**
- B. Start three new sessions, pasting a brief summary of the legacy system into each, to ensure the deliverables are generated with completely fresh context windows.
- C. Generate all three documents sequentially in the current session, using strict XML tags to separate the instructions for each deliverable.
- D. Export the session state to a JSON file, manually edit the context to remove previous document drafts, and re-import it for each new deliverable.

## Question 39 (Q24039)

An architect is designing a technical support assistant that helps users troubleshoot software installation errors. The architect wants to ensure that highly complex, edge-case errors are routed to Tier 2 human support. A junior developer suggests adding the following instruction to the system prompt: 'Evaluate the complexity of the user's issue. Output a confidence score from 0 to 100 indicating your ability to solve it. If your confidence is below 80, trigger the escalate_to_tier2 tool.' Why is this approach flawed according to best practices?

- **A. Self-reported confidence scores are unreliable proxies for actual case complexity and LLMs frequently hallucinate their own confidence levels. ✅**
- B. The confidence threshold of 80 is too high and will result in an overwhelming number of unnecessary escalations to Tier 2.
- C. The prompt should instead ask the LLM to evaluate the user's technical proficiency score and escalate based on the user's inability to follow instructions.
- D. The LLM should use a sentiment analysis tool on the error logs to determine complexity rather than self-reporting confidence.

## Question 40 (Q42489)

A news aggregator wants to use the Message Batches API to categorize incoming articles to achieve a 50% cost reduction. Their product requirements state that articles must be categorized and published to the live feed within 4 hours of receipt. What is the appropriate architectural decision?

- A. Submit batches every 1 hour to ensure the 4-hour requirement is met by aggregating articles into hourly groups and sending them to the Batch API for categorization.
- B. Use the Batch API but configure a `priority` parameter to `high` to bypass the standard 24-hour window, ensuring that each batch completes within the 4-hour latency requirement.
- **C. Do not use the Batch API; use the synchronous Messages API because the Batch API's 24-hour processing window does not meet the 4-hour latency requirement. ✅**
- D. Submit batches every 4 hours and cache the results for the next publishing cycle by collecting articles over a 4-hour window, processing them through the Batch API.

## Question 41 (Q42934)

A financial auditing agent is fed a single massive prompt containing 50 consecutive pages of transaction logs to identify fraudulent patterns. The architect notices the model reliably flags anomalies in the first 5 pages and the last 5 pages, but consistently ignores obvious anomalies in pages 20 through 30. The system cannot be refactored to use chunking due to strict latency requirements. What prompt engineering technique should the architect apply to the aggregated input to best mitigate this position effect?

- A. Instruct the model in the system prompt to process the transaction logs in reverse chronological order.
- B. Inject a repeating system prompt every 10 pages reminding the model to pay attention to the current section.
- **C. Place a synthesized summary of key expected findings at the beginning of the input and organize the detailed transaction logs using explicit, distinct section headers. ✅**
- D. Convert the transaction logs into a continuous, unformatted text stream to prevent the model from skipping over structural boundaries.

## Question 42 (Q32906)

An embedded systems engineer is using Claude to write a script that converts a proprietary binary protocol's hex dump into a specific nested Protobuf structure. Despite writing a highly detailed natural language specification of the bitwise operations and byte offsets, Claude consistently misplaces the variable-length header fields in the final Protobuf output. What is the most effective way to correct Claude's parsing logic?

- A. Rewrite the prompt using formal mathematical notation to describe the bitwise operations and byte offsets to eliminate natural language ambiguity.
- **B. Provide 2-3 concrete examples showing the exact hex string inputs alongside their corresponding expected JSON representations of the Protobuf output. ✅**
- C. Ask Claude to generate a C-based parser first, then translate that working logic into the desired target language in a follow-up prompt.
- D. Break the parsing task into individual byte-by-byte extraction prompts, verifying each byte's extraction before moving to the next field.

## Question 43 (Q40096)

A banking bot is designed to update user addresses. The architecture uses dynamic tool provisioning, meaning the `update_address` tool is only provided to the LLM after a `verify_identity` step is completed. However, logs show the LLM sometimes hallucinates the `update_address` tool call before identity verification, guessing the tool's schema. How should the architect handle this?

- A. Add a system prompt instruction that explicitly forbids the LLM from guessing tool names, requiring it to only use functions from the currently provisioned tool list.
- **B. Implement a strict validation layer in the orchestrator to reject any tool call not in the currently provisioned tool array, returning a programmatic error. ✅**
- C. Map the hallucinated `update_address` tool call to a safe, read-only function that logs the attempt and returns a generic message, preventing state changes.
- D. Switch to a less creative model and configure a lower temperature setting to reduce hallucinations, ensuring the model only attempts to use tools from its current list.

## Question 44 (Q40049)

A development team implemented a per-file analysis agent for code reviews. It successfully catches local syntax errors and style violations. However, it fails to detect when a function signature change in `utils.py` breaks a function call in `main.py`. What architectural addition is required to solve this?

- A. Switch the entire review process to a dynamic adaptive decomposition model that re-analyzes file clusters whenever a shared dependency is modified.
- **B. Add a cross-file integration pass that takes the outputs of the per-file analyses and the dependency graph to check for boundary issues. ✅**
- C. Combine the contents of `utils.py` and `main.py` into a single temporary file so the existing per-file agent can detect signature mismatches as local errors.
- D. Use a single, large prompt containing the full contents of both `utils.py` and `main.py` to provide the agent with enough context to check for call-site errors.

## Question 45 (Q24121)

A development team uses Claude to automatically review pull requests. The current prompt instructs Claude to 'Check that inline comments are accurate and flag any issues.' Developers are complaining that Claude is leaving dozens of nitpicky comments on PRs where the code comments are slightly outdated but harmless, causing review fatigue. Which prompt modification will most effectively improve precision and reduce these false positives?

- A. Add an instruction telling Claude to 'Only report high-confidence findings regarding comment accuracy.'
- **B. Change the instruction to 'Flag comments only when the claimed behavior explicitly contradicts the actual code behavior.' ✅**
- C. Instruct Claude to 'Be extremely conservative and only flag comments if you are absolutely sure they will cause developer confusion.'
- D. Ask Claude to assign a confidence score from 1-10 for each flagged comment and filter out anything below 8 in the application logic.

## Question 46 (Q40650)

A developer on your team complains that Claude is ignoring the API design guidelines when they edit files in the `src/api/` directory. You inspect the repository and find the guidelines written in `.claude/rules/api-guidelines.md`. The file contains only standard markdown text with no headers. Why is Claude failing to load these rules conditionally?

- A. Rule files must be named exactly `CLAUDE.md` regardless of which directory they are placed in.
- B. The `.claude/rules/` directory is only evaluated during initial project setup, so the Claude Code server needs to be restarted.
- **C. The file is missing YAML frontmatter with a `paths` field specifying the `src/api/**/*` glob pattern. ✅**
- D. Conditional rules can only be applied to file extensions (e.g., `*.ts`), not to specific directory paths.

## Question 47 (Q24018)

A developer is using Claude to transform deeply nested XML payloads into flat CSV rows. Despite providing a detailed, multi-paragraph explanation of how sibling nodes should be concatenated, Claude's output consistently misaligns the columns. Which iterative refinement technique will most quickly resolve this misalignment?

- A. Increase the temperature parameter to allow Claude more creative freedom in interpreting the XML structure.
- **B. Provide a snippet of the nested XML alongside the exact corresponding CSV row output as a concrete example. ✅**
- C. Write a detailed pseudocode algorithm for Claude to translate into the target programming language.
- D. Ask Claude to explain its understanding of XML parsing before attempting the transformation task again.

## Question 48 (Q39886)

An agent uses an MCP tool to query a legacy mainframe database. The mainframe has a strict maintenance window every night from 2:00 AM to 3:00 AM, during which all queries are rejected with a "System Offline" code. Currently, the tool returns `isError: true`, `errorCategory: "transient"`, and `isRetryable: true`. Why is this configuration problematic during the maintenance window, and how should it be fixed?

- **A. It causes the agent to rapidly retry the query, wasting tokens and compute resources for an hour. It should be changed to `isRetryable: false` with a human-readable description explaining the maintenance window so the agent can inform the user to wait. ✅**
- B. It causes the agent to permanently delete the tool from its context, preventing any future queries to the mainframe even after the maintenance window ends. It should be changed to `isError: false` with an empty result set to keep the tool active during the maintenance window.
- C. It violates the MCP specification, which requires all transient errors to be `isRetryable: false` to prevent infinite retry loops that degrade system performance. It should be changed to `errorCategory: "business"` so the agent treats the outage as a non-retryable business rule violation.
- D. It forces the agent to hallucinate database records by fabricating plausible data when the mainframe is offline, leading to incorrect downstream decisions. It should be changed to `errorCategory: "permission"` so the agent requests administrative access to override the maintenance lock.

## Question 49 (Q42993)

A senior developer uses Claude Code to scaffold a complex GraphQL API. After establishing the core schema and resolvers in a session, the developer wants to hand off the implementation of the `User` mutations to a junior developer, while the senior developer continues working on the `Product` queries. How can session management facilitate this parallel workflow without duplicating the initial setup effort?

- **A. The senior developer uses `fork_session` to create a branch of the current state for the junior developer to use for the `User` mutations, while continuing their own work in the original session. ✅**
- B. The senior developer exports the session history as a JSON file and emails it to the junior developer, who imports it into a new session to continue with the `User` mutations.
- C. Both developers resume the exact same named session simultaneously from different terminals, relying on Claude's native support for concurrent multi-user prompt resolution to work on separate mutations.
- D. The senior developer starts a new session for the junior developer and asks Claude to generate a summary of the GraphQL schema and resolver patterns to bootstrap the `User` mutations context.

## Question 50 (Q40019)

An AI legal assistant is designed to analyze 60-page commercial leases. Users report that the model perfectly extracts clauses from the first few pages and the last few pages, but consistently fails to identify critical indemnification and liability clauses located around page 30. How should the architect redesign the prompt strategy to mitigate this issue?

- A. Instruct the model via the system prompt to focus on the middle pages, specifically marking page 30 as a high-priority section and directing it to search for indemnification and liability clauses within that area.
- B. Reverse the document's page order to place the middle section at the end of the prompt, taking advantage of the model's heightened focus on the final part of the context to locate the critical liability clauses.
- **C. Break the contract into smaller chunks, process each individually, and place a summary of key findings at the beginning of the final aggregated input with explicit section headers. ✅**
- D. Increase the `max_tokens` parameter to its maximum setting to guarantee the model has enough output capacity to list all clauses from the middle of the document without truncating important liability terms.

## Question 51 (Q41662)

A financial services bot is designed to help users dispute credit card charges. A user states, "I don't recognize this $500 charge from Target. Get me a manager." The bot has a `dispute_charge` tool that can resolve this issue. According to conversational AI design best practices for user experience and escalation, which of the following represents the most appropriate next step for the bot?

- A. The bot should execute the `dispute_charge` tool first, and then transfer to a manager to confirm the dispute was filed.
- B. The bot should explain that it can file the dispute immediately, and ask the user if they still want a manager.
- **C. The bot should immediately honor the explicit request for a human agent without attempting to investigate or use the dispute tool. ✅**
- D. The bot should ask the user for the date of the transaction to verify the charge before escalating to a manager.

## Question 52 (Q42485)

An e-commerce bot has `refund_order`, `cancel_order`, and `return_order` tools. A user says, 'I want my money back for order #123, it hasn't shipped yet.' Claude calls `refund_order`, which fails because the backend requires the order to be shipped first; it should have used `cancel_order`. How can the architect prevent this misrouting?

- A. Merge `refund_order`, `cancel_order`, and `return_order` into a single `manage_order` tool, letting the backend resolve the correct action based on the order's shipping state.
- **B. Add explicit boundary explanations in the tool descriptions detailing the specific order state (e.g., 'unshipped' vs 'delivered') required for each tool. ✅**
- C. Modify the system prompt to enforce a sequence where the model must first call a `check_order_status` tool before selecting `refund_order` or `cancel_order` for any user request.
- D. Rename the `refund_order` tool to `process_money_back` to better align with user phrasing, and update its description to specify it only applies to orders that have already shipped.

## Question 53 (Q33090)

Claude returns a `stop_reason` of `tool_use` with three `tool_use` blocks in a single response. The developer executes all three tools successfully. To append the results to the conversation history, the developer creates three separate `user` messages, each containing one `tool_result` block, and appends them sequentially to the `messages` array. What is the architectural flaw in this implementation of the agentic loop?

- A. The developer must append an `assistant` message acknowledging each `tool_result` between the `user` messages to maintain the conversation flow.
- **B. The Anthropic API requires strictly alternating `user` and `assistant` messages; all three `tool_result` blocks must be placed inside a single `user` message. ✅**
- C. Multiple `tool_result` blocks cannot be processed in a single iteration; the developer must force Claude to request one tool at a time using `disable_parallel_tool_use`.
- D. The `tool_result` blocks must be merged into a single JSON array within a `system` message, rather than using `user` messages.

## Question 54 (Q40120)

You attempt to use the `Edit` tool to change a generic `<li>Item</li>` tag to `<li>Updated Item</li>` in a large HTML template. The tool fails and returns an error stating 'Target text is not unique'. Expanding the target text to include surrounding lines still results in a non-unique match error because the exact block structure is repeated identically in a static list. According to official documentation, what is the standard procedure to complete this modification?

- A. Use the `Bash` tool to execute a `sed` script that counts all `<li>` tags and replaces a specific nth occurrence, which requires calculating the exact position within the repeated static list.
- **B. Use the `Read` tool to load the full file contents, perform the targeted modification using your full context awareness, and use the `Write` tool to save the file. ✅**
- C. Use the `Grep` tool with the `-n` flag to find the line number of the target `<li>` tag, then pass this line number to the `Edit` tool as the sole matching criterion for the replacement.
- D. Use the `Glob` tool to locate smaller partial templates that contain the `<li>` tag, then modify the tag in each partial template individually instead of editing the main HTML file directly.

## Question 55 (Q39866)

An AI system is synthesizing information about a company's product development. It ingests three documents: a press release from January announcing the product, a technical blog post from March detailing a key feature change, and a user manual from June with the final specifications. The system's summary incorrectly presents these as three separate, competing product descriptions. What is the most effective way to enable a correct temporal interpretation?

- A. Only process the most recent document, the user manual from June, to establish a single source of truth for the final product state. The system should identify the document with the latest publication date and use its contents exclusively for synthesis.
- B. Feed all documents—the press release, blog post, and user manual—into the context window at once as a single, unstructured block of text. The system should concatenate the raw text from each source without adding any metadata or temporal markers.
- **C. Architect the system to first extract key events from each document into a structured list of objects, each with a 'publication_date' and 'event_description'. Then, pass this time-sorted list to a synthesis agent prompted to 'write a chronological narrative of the product's development.' ✅**
- D. Use a vector search to find the document most semantically relevant to a query like 'final product specification'. The system would embed all three documents, perform a similarity search, and then pass only the top-ranked document to the synthesis agent.

## Question 56 (Q39995)

A legal assistant has two tools: `search_case_law` (for past court rulings) and `search_statutes` (for current legislation). When users ask 'What are the laws regarding tenant eviction?', Claude randomly selects between the two tools, often missing critical context. How should the tool descriptions be improved to fix this?

- A. Combine the tools into a single `search_legal_database` tool, which internally routes queries to case law for past rulings or to statutes for current legislation.
- **B. Update both tool descriptions to explicitly define when to use each tool versus the other, including boundary explanations for ambiguous terms like 'laws'. ✅**
- C. Add a `routing_tool` that Claude must call first to analyze the user's query and select either the `search_case_law` or `search_statutes` tool based on keywords.
- D. Modify the system prompt to instruct Claude to always call both `search_case_law` and `search_statutes` sequentially to ensure all legal queries receive comprehensive context.

## Question 57 (Q40156)

A mobile app developer is building an application with an offline-first architecture. They need to design the synchronization and conflict resolution logic. The developer wants to use Anthropic's Claude to help generate a robust solution tailored to their specific use case. According to best practices for leveraging AI in system design, what is the most effective prompting strategy?

- A. Ask Claude to generate a standard Conflict-Free Replicated Data Type (CRDT) implementation tailored to the app's data model, including merge functions for each data type and a sync protocol that handles offline writes.
- B. Provide the application's data schema and ask Claude to automatically infer the best conflict resolution strategy, such as last-write-wins or operational transformation, and generate the complete synchronization code.
- **C. Prompt Claude to act as a distributed systems architect, ask clarifying questions about data mutation frequency and conflict policies, and then generate the synchronization code based on the answers. ✅**
- D. Request that Claude first write a comprehensive suite of unit tests for a 'last-write-wins' (LWW) policy covering edge cases like clock skew, and then generate the synchronization engine to make those tests pass.

## Question 58 (Q39925)

An architect is implementing structured state persistence for a fleet of code-exploration agents. When an agent crashes due to a network timeout, the coordinator needs to resume the agent's work without losing the high-level goal or the specific files already processed. Which implementation best achieves this?

- A. The coordinator should save the agent's API keys and session tokens to a secure vault, using them to re-establish the connection and replay the last known state from its internal transaction log to restore the agent's high-level goal.
- B. Each agent must continuously append its raw token stream to a Redis cache, allowing the coordinator to perform an exact session replay by feeding the cached tokens back into a new agent instance to restore its precise operational state.
- **C. Agents should periodically export a JSON manifest containing their current high-level goal, a list of processed files, and key extracted entities; the coordinator injects this JSON into the prompt on resume. ✅**
- D. The coordinator should use a `/compact` endpoint on the crashed agent's full context history, then send the resulting compacted text to a newly spawned subagent that uses the summary to infer the high-level goal and continue the task.

## Question 59 (Q32923)

You are tasked with migrating a monolithic state store into modular slices. This will affect dozens of frontend components. If done incorrectly, it could introduce circular dependencies that are difficult to untangle. You want to ensure the dependency graph is fully mapped out and validated before a single line of code is changed. Which approach is best?

- **A. Plan mode, because it enables safe codebase exploration and design before committing to changes, preventing costly rework. ✅**
- B. Explore subagent, because mapping a dependency graph requires isolating verbose discovery output.
- C. Direct execution, because the scope of migrating a state store is well-understood in modern frontend frameworks.
- D. Plan mode to map the graph, followed by the Explore subagent to implement the modular slices.

## Question 60 (Q39963)

An e-commerce agent uses a `get_order_details` tool to assist users. The backend API returns a JSON object with 75 fields, including internal routing IDs, warehouse bin locations, and raw database timestamps. After the agent makes 3 or 4 tool calls during a session, it begins to hallucinate and eventually hits context limits, even though the user is only asking about shipping status and return eligibility. What is the best architectural approach to resolve this?

- A. Switch to a model with a larger context window that can process the full 75-field JSON payloads from each get_order_details call, preventing context overflow across multiple tool invocations.
- **B. Implement a middleware layer that trims the tool output to only include relevant fields (e.g., status, tracking number, return window) before appending it to the conversation context. ✅**
- C. Instruct the model via the system prompt to extract only shipping status and return eligibility from the get_order_details output, discarding internal routing IDs and warehouse bin locations before processing.
- D. Compress the JSON payload from get_order_details by encoding it as a base64 string before passing it to the model, reducing token usage per tool call and avoiding context exhaustion.

