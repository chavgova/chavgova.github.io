---
title: Structured Information Extraction with LLMs
year: 2025
dateLabel: '2025'
showOnTimeline: true
shortTitle: Structured extraction
summary: Fine-tuning Llama 3.x for schema-constrained extraction from travel emails and tickets, delivered through a Dockerized FastAPI service with validation and hallucination checks.
categories: [NLP / LLMs]
tags: [Llama 3.x, LoRA / QLoRA, FastAPI, Docker]
sortKey: 80
featured: true
role: Bachelor’s client project
context: TU/e · industry bachelor’s end project
provenance: Owner-supplied current CV and LaTeX; bachelor’s end project, 2025.
diagram: [Travel request, Adapted LLaMA, Validated JSON]
---
## Context & problem

Travel-related requests contain information that downstream applications need in a predictable structure. Generating fluent text is insufficient when an application expects JSON that can be validated and consumed programmatically.

## My contribution

In this bachelor’s client project, I curated task-specific data and fine-tuned Llama 3.x models with LoRA and QLoRA adaptation. I worked with a ten-person team and the client on requirements, demos, technical documentation, and delivery.

## Technical method

Parameter-efficient fine-tuning adapted the model to schema-constrained extraction. I implemented JSON-schema validation, tests, confidence scoring, regex and heuristic safeguards, and hallucination checks. A Dockerized FastAPI service exposed the model through llama.cpp on CPU/GPU servers.

## Results & lessons

The project delivered an extraction service and supporting technical documentation. It treated model behavior and application reliability as parts of the same problem: a useful extraction system needs to return data in a form the surrounding software can check and handle.

## Limitations

The CV records a client cost reduction, but the comparison baseline and accounting scope are not supplied; no percentage is promoted here. Deployment is supported by the current CV, while a presently accessible public endpoint or service is not asserted. Client data, private code, and internal evaluations are excluded.
