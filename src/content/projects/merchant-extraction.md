---
title: NLP for Merchant Extraction
year: 2026
dateLabel: 'Apr–Aug 2026'
showOnTimeline: true
shortTitle: Merchant extraction
summary: Merchant entity extraction from millions of noisy transaction descriptions, framed as sequence labeling to constrain predictions to the source text.
categories: [Industry ML, NLP / LLMs]
tags: [BIO labeling, BERTje, PySpark, MLflow]
sortKey: 100
featured: true
role: Data Science Intern
context: ABN AMRO · Detecting Financial Crime
provenance: Owner-supplied current CV and technical summary; internship April–August 2026.
confidential: true
diagram: [Transaction text, BIO sequence labeling, Merchant spans]
---
## Context & problem

Transaction descriptions are noisy: merchant names appear alongside payment intermediaries, reference strings, and inconsistent formatting. At the scale of millions of transactions, extracting a merchant requires both contextual understanding and a reproducible experimental workflow.

## My contribution

I approached merchant extraction as BIO sequence labeling. The model assigns boundary and entity labels to the input rather than generating a merchant name, reducing the risk of producing text absent from the transaction description.

I independently framed and executed the project, taking responsibility for problem decomposition, feature generation, data preparation, architecture selection, evaluation, and the final technical recommendation. My work covered character and subword representations, BiLSTMs, small Transformers trained from scratch, and fine-tuning BERTje with a task-specific head. BERTje is a pretrained encoder model; this was an extraction task rather than generative text completion.

## Technical method

The modular PyTorch pipeline supported CRF decoding, an entity-presence head, feature indicators, custom losses, and payment-service-provider-balanced sampling. PySpark, Databricks, and Azure supported feature generation and data processing; MLflow supported experiment tracking across reproducible multi-GPU training and evaluation workflows. Evaluation included threshold selection and systematic testing on previously unseen payment providers.

## Results & lessons

The project delivered model comparisons and a final technical recommendation. An important engineering question was how representation, decoding constraints, and sampling interact on heterogeneous transaction text, particularly when evaluating generalization to previously unseen providers.

## Limitations & public scope

This account describes high-level methods only. Customer records, internal examples, private code, and proprietary evaluation results are excluded. No public benchmark or production-deployment claim is made.
