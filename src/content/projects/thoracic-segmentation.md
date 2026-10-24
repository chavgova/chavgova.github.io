---
title: Medical Image Segmentation of Thoracic Organs
shortTitle: Thoracic segmentation
summary: A reproducible PyTorch pipeline for multi-organ CT segmentation on SegTHOR, with controlled ablations, geometric evaluation, and computational-efficiency comparisons.
year: 2026
dateLabel: '2026 · research in progress'
categories: [Research, Computer Vision]
tags: [PyTorch, SegTHOR, 2.5D segmentation, U-Net / ENet]
sortKey: 65
role: Medical imaging research project
context: Experimental computer vision
provenance: Owner-supplied current LaTeX source; 2026 project. The source describes U-Net benchmarking as ongoing.
diagram: [CT preprocessing, Organ segmentation, Geometry + efficiency]
---
## Context & problem

Multi-organ segmentation of thoracic CT scans requires both spatially meaningful predictions and a careful evaluation process. This project uses the SegTHOR dataset to study model quality alongside computational efficiency.

## My contribution

I developed a deterministic PyTorch pipeline covering HU windowing, augmentation, 2.5D contextual slices, class-balanced losses, FLOPs profiling, and 3D reconstruction. I designed reproducible ablation experiments on a GPU cluster.

## Technical method

Evaluation uses Dice, HD95, and average surface distance (ASD) to examine overlap and geometric differences. The current work includes implementing and benchmarking a U-Net against an ENet baseline, with training/inference FLOPs comparisons.

## Results & lessons

The documented contribution is the pipeline and experimental design. The source describes the architecture comparison as work in progress, so no completed benchmark result or winning configuration is claimed.

## Limitations

This is a research pipeline, not a clinically validated medical device. No diagnostic capability, clinical deployment, or numerical superiority is asserted. Results should be interpreted within the eventual dataset, split, and evaluation protocol.
