# Claude Exam - Questions and Correct Answers

## Question 1 (Q32)

You're implementing the escalation logic for when the agent should call `escalate_to_human`. Your team proposes four different approaches for triggering escalation. Which approach will most reliably identify cases that genuinely require human intervention?

- A. Build a rules engine that maps specific issue types, customer segments, and product categories to escalation decisions, removing the need for model judgment calls.
- B. Implement sentiment analysis that monitors for frustration indicators and trigger escalation when the frustration score exceeds a configured threshold.
- **C. Instruct the agent to escalate when the customer requests a human, when the issue requires policy exceptions, or when the agent cannot make meaningful progress. ✅**
- D. Configure the agent to escalate after three consecutive tool calls that fail to resolve the customer's stated issue.

## Question 2 (Q33)

After investigating a billing dispute over 25+ turns, you've identified that duplicate charges occurred due to a payment gateway timeout triggering retry logic. The required refund ($847) exceeds your $500 authorization limit. You need to call `escalate_to_human`, and the human agent won't have access to your conversation transcript. What context should you pass to enable effective resolution?

- A. Your diagnosis and the refund amount only.
- **B. A structured summary: customer ID, root cause, refund amount, and recommended action. ✅**
- C. The complete conversation transcript with all tool results.
- D. The customer's original complaint verbatim plus the tool result excerpts showing duplicate transactions.

## Question 3 (Q44)

Your `process_refund` tool returns transient technical errors and permanent business errors. The agent wastes 3-4 turns retrying business errors. Both error types currently return only plain text. What's the most effective way to reduce wasted retries while improving customer-facing response quality?

- **A. Return structured error responses with `retryable: false` for business errors and a customer-friendly explanation for Claude to use. ✅**
- B. Add few-shot examples showing how to distinguish retryable from non-retryable errors by parsing error message text.
- C. Add a `check_refund_eligibility` tool that must be called before `process_refund`.
- D. Implement automatic retry logic at the tool level for technical errors only, passing business errors to Claude without retries.

## Question 4 (Q36)

A customer writes: "I've been going back and forth on this return for days. I just want to speak to someone who can actually help me." The agent has confirmed via `lookup_order` that the return is straightforward, within policy, and eligible for immediate processing. What should the agent do?

- A. Ask what specifically hasn't worked in previous attempts before deciding whether to escalate or resolve automatically.
- B. Call `escalate_to_human` immediately to honor the customer's request.
- **C. Acknowledge frustration, inform them this is resolvable now, and offer to complete it or escalate. ✅**
- D. Process the refund via `process_refund` to resolve the underlying issue, then inform them it's complete.

## Question 5 (Q43)

When implementing your `lookup_order` MCP tool, the backend sometimes returns errors. What is the correct pattern for communicating these errors back to the agent?

- A. Throw an exception from the tool handler so the agent framework can catch and log it.
- **B. Return the error message in the tool result content with the `isError` flag set to true. ✅**
- C. Log the error server-side and return an empty result.
- D. Return a success response with a `status` field indicating the error type.

## Question 6 (Q38)

Production logs reveal inconsistent error handling because your MCP tool returns uniform error responses: `{"isError": true, "content": [{"type": "text", "text": "Operation failed"}]}`. What's the most effective improvement?

- **A. Enhance error responses with structured metadata: include `errorCategory` (transient/validation/permission), `isRetryable` boolean, and a description of what caused the failure. ✅**
- B. Add few-shot examples to the system prompt demonstrating how to interpret error message patterns.
- C. Implement retry logic with exponential backoff in your MCP server for all errors.
- D. Create an `analyze_error` MCP tool the agent calls after any failure.

## Question 7 (Q37)

The agent verifies customer identity through a multi-step process before resetting passwords. After the customer answers the third verification question, the agent asks them to provide their name again. What's the most likely cause?

- A. The verification tool is clearing the agent's internal state after each successful validation step.
- B. The prompt lacks instructions telling Claude to remember information across multiple exchanges.
- **C. The conversation history isn't being passed in subsequent API requests. ✅**
- D. Claude's memory retention is limited to two conversational turns by default.

## Question 8 (Q41)

Your agent identifies that a billing dispute involves a promotional pricing error requiring manager approval, beyond the agent's authorization level. How should the workflow handle this mid-process escalation?

- A. Attempt the refund with `process_refund` anyway, escalating only if the system rejects it.
- B. Call `escalate_to_human` passing only the customer's original message.
- **C. Compile a structured handoff with customer details, order info, and the identified issue before calling `escalate_to_human`. ✅**
- D. Persist the complete conversation and tool response history to a database, then call `escalate_to_human` with a reference ID.

## Question 9 (Q35)

During a billing dispute, the agent retrieves customer and order details, but `process_refund` returns a timeout. The agent can explain the charges and verify eligibility but cannot process the refund. What approach best balances first-contact resolution with appropriate error handling?

- A. Escalate immediately to a human agent.
- **B. Explain the billing, confirm refund eligibility, acknowledge the system issue preventing immediate processing, and offer escalation or retry later. ✅**
- C. Implement automatic retries with exponential backoff, keeping the conversation open until successful.
- D. Confirm the refund will be processed and close the conversation.

## Question 10 (Q34)

Compliance requires that refunds exceeding $500 automatically escalate to a human and cannot be left to model discretion. How should you achieve guaranteed compliance?

- **A. Implement a hook to intercept tool calls; when the refund amount exceeds $500, block it and invoke human escalation. ✅**
- B. Strengthen the system prompt with emphatic language.
- C. Add few-shot examples showing correct escalation behavior at various refund amounts.
- D. Modify the refund tool to return an error asking the agent to escalate.

## Question 11 (Q40)

A customer says they are frustrated and want to talk to a real person now. The agent has not yet called any tools to investigate their account. What should the agent do?

- A. Immediately call `escalate_to_human` with the conversation history.
- B. First call `get_customer` and `lookup_order`, then escalate.
- **C. Acknowledge the frustration and ask one targeted question to understand the specific issue before escalating. ✅**
- D. Explain what the agent can help with and escalate only if the customer repeats their request.

## Question 12 (Q45)

Your agent has called `lookup_order` multiple times. Each response includes 40+ fields, and tool outputs now represent most of the context. The customer mentions two more orders. What's the most effective approach before additional lookups?

- A. Proceed with additional lookups without modifying existing tool output context.
- **B. Extract only return-relevant fields from each existing order response, removing verbose details. ✅**
- C. Move all tool responses to a vector database with semantic indexing.
- D. Replace structured responses with natural-language summaries.

## Question 13 (Q42)

A customer raises three separate issues over 45 turns. At turn 48, they ask about the first issue, and the conversation is approaching context limits. What strategy best maintains the agent's ability to address all issues?

- A. Extract and persist structured issue data into a separate context layer.
- B. Implement a sliding window retaining the most recent 30 turns.
- **C. Summarize earlier turns into a narrative description, preserving full message history only for the active issue. ✅**
- D. Rely on MCP tools to re-fetch relevant information on demand.

## Question 14 (Q31)

A customer returns four hours after a 32-turn billing dispute session. Previous tool results are now stale, and the agent sometimes references them even after fresh calls return different information. What approach most reliably handles returning customers?

- A. Resume with full history and automatically re-call all previously used tools.
- B. Resume with full history and instruct the agent to prefer recent tool results.
- **C. Start a new session, inject a structured summary of the previous interaction, then make fresh tool calls before engaging. ✅**
- D. Resume with full history but filter out previous `tool_result` messages.

## Question 15 (Q39)

When the agent calls `lookup_order` and receives order details showing the item was purchased 45 days ago, how does the agentic loop determine whether to call `process_refund` or `escalate_to_human` next?

- A. The agent executes the remaining steps in a tool sequence planned at the start.
- B. The orchestration layer automatically routes to the next tool based on order status.
- C. The agent follows a pre-configured decision tree.
- **D. The order details are added to the conversation and the model reasons about which action to take. ✅**

## Question 16 (Q6)

The web search agent returns 2024 adoption statistics while the document analysis agent returns 2022 statistics. The synthesis agent incorrectly flags them as contradictory rather than recognizing growth over time. What change best enables correct interpretation?

- A. Configure web search to return only results from the past six months.
- B. Instruct synthesis to always treat the most recent data as authoritative.
- **C. Require subagents to include publication or data collection dates in their structured outputs. ✅**
- D. Add a conflict resolution agent that discards older data.

## Question 17 (Q4)

The web search agent has gathered relevant sources. The document analysis agent now needs to examine them. How does information typically flow between these specialized subagents?

- **A. The coordinator receives the web search agent's output and includes relevant findings in the prompt when invoking the document analysis agent. ✅**
- B. The agents communicate through an event-driven message queue.
- C. Both agents access a shared memory store.
- D. The web search agent directly invokes the document analysis agent.

## Question 18 (Q12)

Detailed step-by-step instructions make a web search subagent brittle and unable to adapt. What's the most effective way to improve subagent adaptability?

- A. Classify requests as well-defined or exploratory and use different instruction styles.
- **B. Specify research goals and quality criteria rather than procedural steps, letting the subagent determine its search strategy. ✅**
- C. Remove procedural details entirely and delegate with only a simple goal.
- D. Add explicit fallback directives to the detailed instructions.

## Question 19 (Q2)

After multiple research stages, the coordinator must pass context to the report generation agent for final output with proper citations. What strategy provides the best balance of completeness and efficiency?

- A. Pass a condensed summary attributing findings to sources by name only.
- B. Pass the full accumulated context from all prior agents.
- C. Pass only the synthesis draft and match citations in post-processing.
- **D. Pass the synthesis draft along with a structured source index mapping key claims to source URLs and relevant excerpts. ✅**

## Question 20 (Q11)

Specialized agents return financial JSON, prose news summaries, and structured patent lists. The synthesis agent converts everything to bullet points, losing clarity. What change would most improve briefing quality?

- A. Standardize all subagent outputs to JSON.
- B. Transform all outputs to a common intermediate representation.
- **C. Update the synthesis agent to render each content type appropriately: financial data as tables, news as prose. ✅**
- D. Standardize all subagent outputs to prose summaries.

## Question 21 (Q13)

Follow-up summarization queries take 40+ seconds because the coordinator spawns a synthesis subagent and passes 80K+ tokens, even though the coordinator already has the findings. What's the most effective improvement?

- **A. Have the coordinator handle straightforward summarization requests directly using its existing context, reserving subagents for complex analysis. ✅**
- B. Pre-generate and cache summaries at multiple granularities.
- C. Enable prompt caching on the synthesis subagent.
- D. Spawn the synthesis subagent with reduced context and have it request findings on demand.

## Question 22 (Q8)

Production reviews reveal inconsistent handling of uncertainty in final reports. What systematic approach best preserves nuance without excessive hedging?

- **A. Structure reports with explicit sections distinguishing well-established findings from contested ones, preserving source characterizations and methodological context. ✅**
- B. Add a verification subagent and only pass claims corroborated by two sources.
- C. Normalize uncertainty to probability scores and weight-average findings.
- D. Filter uncertain findings before they reach the coordinator.

## Question 23 (Q5)

Simple fact-checking queries traverse all four subagents, while complex research benefits from the full pipeline. Query distribution is diverse and evolving. What's the most effective optimization?

- **A. Have the coordinator analyze each query and dynamically decide which subagents to invoke. ✅**
- B. Implement pattern-based routing to predefined subagent combinations.
- C. Create a fast path for factual questions and use the full pipeline for everything else.
- D. Train a query-complexity classifier.

## Question 24 (Q3)

A generic `analyze_document` tool with a free-text instruction produces inconsistent output formats. What's the most effective way to improve reliability?

- A. Have the coordinator pre-classify each analysis request.
- B. Enhance the generic tool description with detailed examples.
- C. Add an `analysis_type` enum to the generic tool.
- **D. Split it into purpose-specific tools with defined input/output contracts. ✅**

## Question 25 (Q14)

A document analysis subagent processes 12 cited precedents sequentially, taking over three minutes. What's the most effective way to reduce latency while preserving coordinator monitoring and debugging?

- **A. Have the coordinator spawn parallel document analysis subagents, each handling a subset of precedents, then aggregate results before synthesis. ✅**
- B. Implement an asynchronous message queue with a worker pool.
- C. Create a recursive agent hierarchy.
- D. Enable the document analysis subagent to spawn its own subagents.

## Question 26 (Q9)

Final reports frequently contain claims without source attribution because the synthesis agent loses track of which sources support which conclusions. What's the most effective architectural change?

- A. Inject source identifier prefixes into text before each handoff.
- B. Reconstruct citations using semantic similarity matching.
- **C. Require all subagents to output structured claim-source mappings that synthesis must preserve and merge. ✅**
- D. Analyze complete interaction logs with a citation-resolution agent.

## Question 27 (Q10)

The coordinator invokes synthesis after research agents complete, but synthesis says no research findings were provided. What's the most likely cause?

- **A. The coordinator did not include the outputs from previous agents in the synthesis agent's prompt. ✅**
- B. The synthesis agent needs tools to fetch other agents' conversation histories.
- C. The synthesis agent's context window is too small.
- D. The subagents need to share a single API connection.

## Question 28 (Q15)

The coordinator has valid `AgentDefinitions` and reasons about delegation, but no subagent execution occurs. Logs show no errors. What's the most likely cause?

- **A. The coordinator's `allowedTools` configuration doesn't include `Task`. ✅**
- B. The system prompt doesn't explicitly list available subagent types.
- C. The coordinator's `max_tokens` is too low.
- D. Explicit context forwarding is not configured.

## Question 29 (Q7)

Reports make factual claims without citations because source metadata is lost during summarization. What's the most effective approach?

- A. Skip summarization and pass full raw outputs to the report generator.
- **B. Have each agent output structured data separating content summaries from source metadata. ✅**
- C. Have the report generator query web search again.
- D. Embed source references inline within summary text.

## Question 30 (Q1)

A multi-agent research pipeline crashed after processing 12 of 28 documents. You need to resume without repeating work or losing fidelity. What state-management approach best balances fidelity with context efficiency?

- A. Have each agent maintain and reload its own persistent state file.
- **B. Have each agent persist a structured report to a known location. On resume, the coordinator loads the reports and injects relevant state into agent prompts. ✅**
- C. Persist and replay the coordinator's full conversation log.
- D. Index all outputs in a shared vector store.

## Question 31 (Q60)

After a batch of 10,000 documents, 300 failed with `context_length_exceeded`. The results identify failures by `custom_id`. What's the most cost-effective approach?

- A. Reprocess the entire batch with prompt caching enabled.
- B. Resubmit the entire batch using a model with a larger context window.
- **C. Resubmit only the 300 failed documents after chunking them into smaller pieces, then combine partial extractions. ✅**
- D. Increase `max_tokens` for the failed documents.

## Question 32 (Q57)

An extraction system inconsistently extracts and formats a `materials` field despite a well-defined schema. What's the most effective way to improve consistency?

- **A. Add few-shot examples showing complete input-output pairs with standardized material description formats. ✅**
- B. Set temperature to 0.
- C. Make the `materials` field required.
- D. Switch to a more capable model tier.

## Question 33 (Q58)

Documents arrive continuously. You want the Batch API's 50% discount and must provide results within 30 hours with 99.9% reliability. Which batching strategy is most appropriate?

- A. Submit one batch at the end of each day.
- B. Submit batches every six hours.
- **C. Submit batches every four hours. ✅**
- D. Use the real-time API for all documents.

## Question 34 (Q51)

An extraction pipeline processes restaurant menus with inconsistent price and dietary formatting. What's the most reliable approach?

- **A. Define a strict output schema and include format-normalization rules in the prompt. ✅**
- B. Request multiple extraction attempts and select the most common format.
- C. Use separate extraction calls for each field.
- D. Extract data as-is and normalize it in post-processing code.

## Question 35 (Q54)

In 18% of invoice extractions, line item amounts do not match the grand total. Downstream systems reject mismatches. What's the most effective reliability improvement?

- **A. Add `calculated_total` and `stated_total` fields, and flag records for human review when they differ. ✅**
- B. Add few-shot examples where line items sum correctly.
- C. Use a separate validation model to reconcile discrepancies.
- D. Automatically adjust line item amounts proportionally.

## Question 36 (Q46)

Standard monthly reports can be archived after processing, while urgent exception reports must trigger alerts within 30 minutes. Both use the same schema. How should you minimize cost while meeting latency requirements?

- **A. Route standard reports to the Batch API and urgent exception reports to the real-time Messages API. ✅**
- B. Submit all documents to the real-time Messages API.
- C. Submit all documents to the Batch API.
- D. Queue all documents and submit hourly batches.

## Question 37 (Q48)

High-confidence extractions have 97% accuracy overall, and you plan to automate them. Before deploying, what validation step is most critical?

- A. Run a two-week pilot routing 25% directly downstream.
- B. Compare accuracy at different confidence thresholds.
- **C. Analyze accuracy by document type and field to verify performance across all segments, not just in aggregate. ✅**
- D. Verify that 97% accuracy meets all downstream requirements.

## Question 38 (Q53)

Strict schemas eliminate JSON syntax errors, but 5% of extractions contain empty arrays or nulls for required information that exists in varied source formats. What's the most effective fix?

- A. Build a regex-based post-processing layer.
- B. Make the fields optional and route incomplete records to review.
- **C. Add few-shot examples demonstrating extractions from documents with varied structures. ✅**
- D. Retry when validation detects empty fields.

## Question 39 (Q49)

Contracts frequently include amendments, and the model inconsistently extracts either original or amended values without indicating which applies. What's the most effective approach?

- A. Remove superseded sections before extraction.
- B. Instruct the model to always extract only the most recent value.
- **C. Redesign the schema so amended fields capture multiple values, each with source location and effective date. ✅**
- D. Flag every amended contract for manual review.

## Question 40 (Q50)

Your extraction system retries with validation-error feedback. For which failure pattern would additional retries be least effective?

- A. Dates include time when only `YYYY-MM-DD` is required.
- B. Keywords are nested objects instead of a flat string array.
- C. Citation counts are locale-formatted strings instead of integers.
- **D. The model extracts "et al." when the full author list exists only in an external document not included in the input. ✅**

## Question 41 (Q59)

Twelve percent of extractions contain semantic errors that pass JSON schema validation. Human reviewers can check only 20% of extractions. Which approach most effectively allocates reviewer attention?

- A. Randomly sample 20%.
- B. Review documents with formatting anomalies.
- **C. Have the model output field-level confidence scores, then calibrate review thresholds using a labeled validation set. ✅**
- D. Prioritize records with empty required fields.

## Question 42 (Q52)

An event metadata extraction system frequently invents plausible values for fields not mentioned in articles. What's the most effective way to reduce false extractions?

- A. Use a second LLM call to verify each value.
- B. Make all schema fields non-nullable.
- **C. Add prompt instructions to return `null` for any field where information is not directly stated in the source. ✅**
- D. Upgrade to a more capable model.

## Question 43 (Q56)

A `property_type` enum fails on uncommon and newly appearing property types. What's the most effective long-term solution?

- A. Change `property_type` to a free-form string.
- **B. Add an `other` enum value with a separate `property_type_detail` string field. ✅**
- C. Continuously expand the enum.
- D. Map unexpected types to the closest existing enum value.

## Question 44 (Q47)

A `skills: string[]` extraction has inconsistent compound splitting, inferred skills, and array granularity. The prompt says only "Extract all skills mentioned." What's the most effective improvement?

- A. Add post-extraction normalization.
- B. Enrich each skill with confidence and source quote.
- C. Add hard constraints such as 10-20 skills maximum.
- **D. Add few-shot examples demonstrating compound phrase handling, explicit mention criteria, and appropriate entry granularity. ✅**

## Question 45 (Q55)

Claude sometimes calls `lookup_citations` before `extract_metadata`, but citation lookup requires the DOI produced by metadata extraction. What's the most effective way to guarantee extraction happens first?

- A. Force `extract_metadata` for every API call.
- **B. Set `tool_choice` to the specific `extract_metadata` tool for the first call, then process enrichment requests in subsequent turns. ✅**
- C. Reorder the tool definitions.
- D. Set `tool_choice` to `any` with prompt instructions.

## Question 46 (Q26)

An exploration subagent spent 30 minutes analyzing a legacy system. The session was interrupted, and a teammate renamed two utility functions. What's the most effective way to continue?

- A. Launch a fresh subagent with the prior transcript.
- B. Resume without mentioning the changes.
- C. Launch a fresh subagent with a summary.
- **D. Resume the subagent from its previous transcript and inform it about the renamed functions. ✅**

## Question 47 (Q23)

Caching logic spans 15 files and about 8,000 lines. What's the most effective next step for building understanding while managing context constraints?

- **A. Analyze imports and class hierarchies to identify the base cache class, read it to understand the interface, then trace specific invalidation implementations. ✅**
- B. Prioritize the largest files and read them first.
- C. Sequentially load all 15 files.
- D. Read only lines matching `invalidate` and `expire`.

## Question 48 (Q22)

An engineer wants to explore two refactoring approaches independently, starting from yesterday's completed analysis. What's the most effective session structure?

- A. Start two fresh sessions with a manual summary.
- B. Resume for one approach and create a new session for the other.
- C. Explore both approaches sequentially in one thread.
- **D. Use `fork_session` to create two branches from yesterday's analysis. ✅**

## Question 49 (Q27)

An MCP server provides specialized refactoring tools, but the agent still uses basic text manipulation. The MCP tools have minimal descriptions. What's the most effective improvement?

- A. Accept the behavior because basic tools are more predictable.
- B. Implement a request classifier.
- **C. Enhance MCP tool descriptions to explain when each tool is preferable and clarify expected inputs and outputs. ✅**
- D. Remove the Write tool.

## Question 50 (Q25)

An agent must investigate intermittent 500 errors in a 200+ file codebase, and the involved components are unknown. What decomposition approach is most effective?

- **A. Dynamically generate investigation subtasks based on discoveries at each step, adapting the plan as new information emerges. ✅**
- B. Run parallel workers for routing, middleware, business logic, and database layers immediately.
- C. Define and execute a fixed sequence upfront.
- D. Map all code paths before reading files.

## Question 51 (Q30)

A new engineer wants to understand authentication and authorization architecture in an 800+ file multi-service codebase. What exploration strategy is most effective?

- A. Read documentation, then ask the new engineer which files matter.
- B. Read all files containing auth-related keywords.
- C. Launch parallel subagents to explore every service.
- **D. Use Grep to find authentication entry points, read those files, then follow imports and function calls incrementally. ✅**

## Question 52 (Q19)

An engineer wants to continue a specific prior Claude Code investigation named `auth-deep-dive`. How should she resume?

- **A. Use `--resume auth-deep-dive`. ✅**
- B. Start fresh and re-read the same files.
- C. Find and use the session UUID.
- D. Use `--continue`.

## Question 53 (Q17)

An engineer must find all callers of a function that is exposed through wrapper modules under renamed aliases. What strategy will most reliably identify all callers?

- **A. Read the library and wrapper modules to identify all exposed names, then Grep for each name across the codebase. ✅**
- B. Find all files importing the library or wrappers, then inspect them.
- C. Search project documentation.
- D. Search only for the original function name.

## Question 54 (Q24)

An agent must identify untested paths in a 45-file legacy payment module. After reading eight files, accuracy is degrading and key flows remain untraced. What's the most effective approach?

- **A. Spawn subagents to investigate specific questions while the main agent coordinates findings and preserves high-level understanding. ✅**
- B. Switch entirely to Grep.
- C. Clear context and re-read selected files using a scratchpad.
- D. Summarize everything, clear context, and continue from only the summary.

## Question 55 (Q28)

An agent has analyzed a complex service module. A developer wants to independently develop and compare two testing strategies. How should sessions be managed?

- **A. Resume the analysis session with `fork_session` enabled, creating a separate branch for each testing strategy. ✅**
- B. Develop both strategies sequentially in the original session.
- C. Start two fresh sessions and re-read the files.
- D. Export findings to a file and create two new sessions.

## Question 56 (Q20)

After a long rendering-system exploration, an engineer asks about physics integration. Recent responses have become generic rather than referencing discovered classes. What's the most effective approach?

- A. Spawn a physics subagent and manually synthesize in the degraded main conversation.
- B. Clear context completely.
- C. Continue in the current context with more targeted prompts.
- **D. Summarize key rendering findings, then spawn a subagent for physics exploration with that summary in its initial context. ✅**

## Question 57 (Q18)

In extended exploration sessions, the agent starts giving inconsistent answers and forgetting previously discussed modules. What's the most effective solution?

- A. Automatically clear context every 15 minutes.
- **B. Have the agent maintain a scratchpad file recording key findings and reference it for subsequent questions. ✅**
- C. Create summaries of all files before exploration.
- D. Switch to a higher-capacity model.

## Question 58 (Q29)

An agent needs to insert a helper function into the middle of a repetitive 150-line module. The Edit tool cannot find unique text to match. What's the most reliable way to complete the insertion?

- **A. Use Read to load the file, add the function at the appropriate location, then Write the updated file. ✅**
- B. Use Edit's `replace_all` on a common pattern.
- C. Append the function to the end using Bash.
- D. Use an extremely long `old_string`.

## Question 59 (Q21)

An engineer wants to resume a valid exploration session, but three of the 12 previously read files changed overnight. What approach best balances efficiency and accuracy?

- **A. Resume the session and inform the agent which specific files changed for targeted re-analysis. ✅**
- B. Resume and re-read all 12 files.
- C. Start a fresh session.
- D. Resume without mentioning changed files.

## Question 60 (Q16)

A local MCP server provides code analysis tools, but the agent uses Grep instead of `analyze_dependencies`. The MCP description is only "Analyzes dependency graph." What's the most effective way to improve tool selection?

- **A. Expand the MCP tool description to detail capabilities and outputs, such as direct imports, transitive dependencies, and cycles. ✅**
- B. Split it into several granular tools.
- C. Remove Grep.
- D. Add routing instructions to the system prompt.
