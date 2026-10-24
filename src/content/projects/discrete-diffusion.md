---
title: Quantifying Creativity in Discrete Diffusion Models
year: 2026
dateLabel: '2026'
showOnTimeline: true
shortTitle: Discrete diffusion
summary: Adapting a continuous-diffusion creativity framework to categorical diffusion, with calibrated reverse-process scoring and reproducible experiments on H100 GPUs.
categories: [Research, Computer Vision]
tags: [D3PM, PyTorch, U-Net / ResNet, HPC]
sortKey: 60
featured: true
role: Generative modeling research
context: Experimental AI research
provenance: Owner-supplied current CV and earlier project summary; 2026 research, including categorical diffusion experiments on MNIST.
diagram: [Categorical diffusion, Reverse-process scoring, Calibrated evaluation]
---
## Context & problem

Discrete diffusion models operate over categorical states. This research adapted a creativity-evaluation framework originally developed for continuous diffusion to discrete denoising diffusion probabilistic models (D3PMs). Earlier MNIST experiments provided a contained setting for studying transition processes and model designs.

## My contribution

I implemented conditional ResNet and U-Net models in PyTorch with absorbing and uniform noise processes. I adapted the evaluation framework to the discrete setting and ran reproducible experiments on Snellius H100 GPUs.

## Technical method

The experimental axes included transition process and model design. Reverse-process scorers were calibrated using per-step KL divergence, and fidelity was evaluated with macro-F1, Cohen’s κ, and token accuracy. The investigation connected generative modeling choices with the behavior of an evaluation framework.

## Results & lessons

The work produced a discrete adaptation of the framework and a reproducible experimental setup for studying it. It developed experience in categorical generative models, scorer calibration, and evaluation on shared GPU infrastructure.

## Limitations

The supplied CV does not establish a universal measure of creativity, a particular performance score, or superiority of one configuration. Fidelity metrics and scorer calibration are reported as methods, not proof of creative ability. No publication, state-of-the-art result, or transfer beyond the investigated setting is asserted.
