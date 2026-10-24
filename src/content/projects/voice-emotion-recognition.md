---
title: Voice Emotion Recognition
summary: Experiments classifying eight emotions from voice recordings, examining gender-specific and gender-neutral models and the limits of available data.
categories: [Research, NLP / LLMs, Earlier Work]
tags: [Speech analysis, Neural networks, Emotion classification, Data analysis]
sortKey: 10
role: Early machine learning research
context: Speech & affective computing
provenance: Archived Projects page and owner-supplied current CV, which groups the voice-emotion robot prototype under 2021–2022 without dating the standalone experiments.
diagram: [Voice recordings, Neural classification, Eight emotion classes]
---
## Context & problem

This research explored whether voice recordings carry information useful for classifying human emotions. The study considered eight emotion classes and compared gender-specific and gender-neutral modeling approaches.

## My contribution

I conducted data analysis and experiments with neural network classifiers, examining differences between the modeling approaches and confusion between particular emotions.

## Technical method

The current CV identifies CNN-based classification with audio preprocessing and feature extraction. The archived description records separate female, male, and gender-neutral models. It also identifies insufficient male data as a constraint on generalization and points toward better-labeled data as a direction for improvement.

## Results & lessons

The useful lesson in the surviving account is the relationship between data coverage and classifier behavior. The work subsequently informed the emotion-recognition component of the QUINN assistant.

## Limitations

Historical accuracy figures are intentionally not reproduced here: the extract does not document the train/test protocol, sample sizes, or independence of evaluation data. They would not establish performance on new speakers or real-world emotional states. Project dates and a full methodology remain unverified.
