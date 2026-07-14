# Question 1

In production, final reports frequently contain claims without proper source attribution. Investigation shows that while the web search and document analysis agents correctly attach citations to their outputs, the synthesis agent loses track of which sources support which conclusions when combining findings. What's the most effective architectural change?

A Maintain complete transcripts of all subagent interactions and add a citation-resolution agent to analyze logs and determine attributions before report generation.

**B Require all subagents to output structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources.**

C Add a verification step where the report generator uses semantic similarity matching against original sources to reconstruct which claims came from which documents.

D Have the coordinator inject source identifier prefixes into text before each handoff, then parse these prefixes at report generation to reconstruct citations.

## Question 2

Your codebase exploration tool stores session IDs to allow engineers to continue investigations across work sessions. An engineer spent an hour yesterday analyzing a legacy authentication module, building context about its architecture and dependencies. They want to continue today. The session ID is valid, but version control shows 3 of the 12 files the agent previously read were modified overnight by a teammate's merge. What approach best balances efficiency and accuracy?

A Resume the session without informing the agent about the changed files
B Start a fresh session to ensure the agent works with current codebase state without stale assumptions
**C Resume the session and inform the agent which specific files changed for targeted re-analysis**
D Resume the session and immediately have the agent re-read all 12 previously analyzed files

## Question 3

When analyzing complex legal cases that cite multiple precedents, the document analysis subagent processes each sequentially. A landmark case citing 12 precedents takes over 3 minutes to analyze completely. What's the most effective way to reduce this latency while preserving the coordinator's ability to monitor and debug the system?

A Implement a message queue where precedent analysis tasks are processed asynchronously by a pool of worker agents.
B Create a recursive agent hierarchy where analysis agents subdivide work among child agents until reaching single-precedent granularity.
**C Have the coordinator spawn parallel document analysis subagents, each handling a subset of precedents, then aggregate results before synthesis.**
D Enable the document analysis subagent to spawn its own specialized subagents dynamically when it encounters cases with many citations.
