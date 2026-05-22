# Auto Skeleton Loader Library

## Project Name Suggestions

* auto-skeleton
* smart-auto-skeleton
* phantom-loader
* ghost-ui
* bonecraft

---

# Project Goal

Build a React library that automatically generates skeleton loaders based on the original component structure.

Instead of manually creating skeletons for every UI component, developers can simply wrap any component with:

```jsx
<AutoSkeleton loading={loading}>
   <ProductCard />
</AutoSkeleton>
```

The library will automatically:

* analyze the component tree
* detect element types
* generate matching skeleton placeholders
* preserve layout and spacing
* support shimmer and pulse animations

---

# Main Problem This Solves

Most skeleton loaders today are:

* manually written
* repetitive
* difficult to maintain
* often inconsistent with the actual UI

This library removes that manual work entirely.

---

# Target Audience

* React developers
* Next.js developers
* frontend engineers
* dashboard creators
* SaaS applications
* ecommerce platforms

---

# Tech Stack

* React
* Vite
* JavaScript
* CSS
* npm package

Future support:

* TypeScript
* Tailwind CSS
* Next.js optimizations
* AI layout prediction

---

# Core Features

## 1. Automatic Skeleton Generation

The library traverses the React component tree and replaces elements with skeleton placeholders.

Example:

Input:

```jsx
<div>
   <img src="product.jpg" />
   <h1>Product Name</h1>
   <p>Description</p>
   <button>Buy</button>
</div>
```

Generated Skeleton:

* image placeholder
* title placeholder
* paragraph placeholder
* button placeholder

---

## 2. Layout Preservation

The generated skeleton should preserve:

* spacing
* flex layouts
* grid layouts
* alignment
* sizing

This makes the loading state visually match the final UI.

---

## 3. Animation Support

Support multiple animations:

* shimmer
* pulse
* wave

Example:

```jsx
<AutoSkeleton animation="shimmer">
```

---

## 4. Smart Size Detection

The library should estimate realistic dimensions.

Examples:

* headings wider than buttons
* paragraphs using multiple lines
* avatars detected as circles

---

## 5. Developer Friendly API

Simple usage:

```jsx
<AutoSkeleton loading={loading}>
   <Card />
</AutoSkeleton>
```

Advanced usage:

```jsx
<AutoSkeleton
   loading={loading}
   animation="pulse"
   duration={1.5}
>
   <Card />
</AutoSkeleton>
```

---

# Folder Structure

```txt
src/
│
├── components/
│   ├── AutoSkeleton.jsx
│   └── SkeletonElement.jsx
│
├── utils/
│   ├── traverse.jsx
│   ├── detectType.js
│   ├── sizeEstimator.js
│   └── cloneWithSkeleton.jsx
│
├── hooks/
│   └── useSkeletonConfig.js
│
├── constants/
│   └── elementMap.js
│
├── styles/
│   └── skeleton.css
│
└── index.js
```

---

# File Responsibilities

## AutoSkeleton.jsx

Main wrapper component.

Responsibilities:

* receives children
* checks loading state
* starts traversal process
* passes configuration

---

## SkeletonElement.jsx

Reusable skeleton block.

Responsibilities:

* render shimmer block
* support custom radius
* support animations
* support dynamic sizing

---

## traverse.jsx

Core engine of the library.

Responsibilities:

* recursively traverse React nodes
* detect node types
* replace nodes with skeletons
* preserve layout structure

---

## detectType.js

Determines what each element represents.

Examples:

* img → image
* h1 → text
* button → action

---

## sizeEstimator.js

Generates estimated dimensions for skeletons.

Examples:

* text height
* image dimensions
* button sizing

---

## cloneWithSkeleton.jsx

Clones original elements while replacing children with skeleton versions.

---

## useSkeletonConfig.js

Stores and normalizes configuration options.

---

## elementMap.js

Central mapping for HTML element categories.

---

## skeleton.css

Contains:

* shimmer animation
* pulse animation
* dark mode support
* transition effects

---

# Library Architecture

## Traversal Flow

```txt
AutoSkeleton
    ↓
traverseTree()
    ↓
detectType()
    ↓
estimateSize()
    ↓
render SkeletonElement
```

---

# MVP Requirements

The first version should support:

* div
* img
* button
* p
* span
* h1-h6

The MVP should:

* work correctly
* preserve layout
* support shimmer animation
* publish successfully on npm

No AI features required initially.

---

# Advanced Features Roadmap

## Phase 2

* Tailwind class detection
* circular avatar detection
* multiline paragraph generation
* dark mode support
* TypeScript support

---

## Phase 3

* Next.js optimization
* responsive skeleton prediction
* intelligent width estimation
* theme presets

---

## Phase 4

AI-powered layout prediction:

* analyze component structure
* infer UI hierarchy
* generate highly accurate skeletons automatically

---

# Vite Configuration

Use Vite library mode.

Requirements:

* externalize react and react-dom
* generate esm and cjs builds
* optimize package size

---

# npm Publishing Requirements

The project should:

* be fully publishable on npm
* contain clean exports
* support tree shaking
* include README.md
* include LICENSE
* include examples

---

# Example Usage

## Basic

```jsx
<AutoSkeleton loading={loading}>
   <ProductCard />
</AutoSkeleton>
```

---

## Advanced

```jsx
<AutoSkeleton
   loading={loading}
   animation="shimmer"
   duration={1.4}
>
   <Dashboard />
</AutoSkeleton>
```

---

# Expected Deliverables

Build a complete working React library including:

* full source code
* Vite setup
* package.json
* npm-ready configuration
* animations
* traversal engine
* documentation
* example usage
* clean architecture
* production-ready structure

---

# Important Notes

* Use JavaScript not TypeScript for now
* Keep architecture scalable
* Keep code modular
* Prioritize readability
* Avoid overengineering in MVP
* Focus on stable traversal logic first

---

# Final Vision

The library should feel magical for developers.

Goal:

A developer writes:

```jsx
<AutoSkeleton loading={loading}>
   <ComplexComponent />
</AutoSkeleton>
```

And instantly gets a beautiful loading skeleton automatically with almost zero manual work.
