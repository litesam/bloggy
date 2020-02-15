---
title: "React + D3 = Infinite Power"
date: "February, 14 2020"
---

## D3 for visualization

D3 is Data Driven Document which is for manipulating documents(I really mean DOM) based on data. All the data is appended as an SVG to your HTML, which is cool because then you can style it using CSS and do some cool stuffs, you can also add interactions to make it look cool.

I recently started learning about **Data Visualization** from [Curran Kelleher Youtube channel](https://www.youtube.com/user/currankelleher) the stuffs that he teach with D3 is so cool and amazing, you can learn more about D3 there.

## React + D3?

What is the use of *React* in *D3* instead of looking at some Jargon and bloat with just *D3* code you can create simple **Declarative** *React* code with all its optimizations juice, taken from it.
As we all know *React* is a library which is used to manipulate DOM, also *D3* is a library which is used to manipulate DOM. So what are we going to do if both will be going to modify DOM how to fix this issue. There are 2 solutions to this issue, both are:
1. Naive black box approach
2. Correct React approach

## Black Box approach for D3 with React

Before diving into the stuffs if you don't know *D3* you will not understand this so please watch [Curran Kelleher videos](https://www.youtube.com/user/currankelleher). After you've finished watching some starters to know the necessary APIs to know about how to create a simple **Bar Chart** we will start to convert code from [this video from Curran](https://www.youtube.com/watch?v=NlBt-7PuaLk&list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi&index=8) so if you watched the series till this video then you might have **Bar Chart** code as:

```javascript
import {
  select,
  selectAll,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from 'd3';

let svgDom = document.querySelector('svg');

let svg = select(svgDom);

const WIDTH = +svg.attr('width');
const HEIGHT = +svg.attr('height');

function render(data) {
  let xValue = d => d['population'];
  let yValue = d => d.country;
  let margin = { top: 50, right: 40, bottom: 70, left: 100 };
  let innerWidth = WIDTH - margin.left - margin.right;
  let innerHeight = HEIGHT - margin.top - margin.bottom;
  
  let xScale = scaleLinear()
  	.domain([0, max(data, xValue)])
  	.range([0, innerWidth]);
  
  let yScale = scaleBand()
  	.domain(data.map(yValue))
  	.range([0, innerHeight])
  	.padding(0.1);
  
  let g = svg.append('g')
  	.attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.append('g').call(axisLeft(yScale));
  g.append('g').call(axisBottom(xScale))
  	.attr('transform', `translate(0, ${innerHeight})`);
  
	g.selectAll('rect').data(data)
  	.enter().append('rect')
  		.attr('y', d => yScale(d.country))
  		.attr('width', d => xScale(d.population))
  		.attr('height', yScale.bandwidth());
}

csv('data.csv').then(data => {
  data.forEach(d => d.population = +d.population * 1000);
	render(data);
});
```
The above code doesn't contain any *React* it is completely done with *D3*, to render a **Bar Chart** with the data loaded from **data.csv**, which also you can refer to [My implementation with output](https://vizhub.com/litesam/5e27687ecf2c490391ca013633910ef9), so your output will be looking like this:
![D3 image](https://i.imgur.com/NNdqD3r.png "D3 image")

Now for the same program implementation with *React* but this is the Black-Box approach, you still can't read this because of its a simple approach and with this approach you can convert any *D3* examples into *React* but this is not an efficient way, because any manipulations result in complete re-rendering of all the *React* components by *D3*. So let's do this step-by-step.

First let's import the necessary files required for *React* and *D3*:

```jsx
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  select,
  selectAll,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from 'd3';
```

Now let's make all the necessary constants, like `width`, `height` and stuffs:

```jsx
function App() {
  let svgRef = useRef();
  const [data, setData] = useState([]);
  const WIDTH = 960;
  const HIEGHT = 500;
  const MARGIN = { top: 50, right: 40, left: 100, bottom: 50 };
  const INNER_WIDTH = WIDTH - MARGIN.right - MARGIN.left;
  const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

  return <svg width={WIDTH} height={HEIGHT} ref={svgRef} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

From here onwards we just have to load the data using `CSV` from the `d3.csv` which is destructured as `csv`, so let's load the data with `useEffect` hook from React when the component mounts, the code for this will be looking like:

```jsx
function App() {
  ...

  useEffect(() => {
    csv('data.csv').then(cdata => {
      cdata.forEach(d => d.population = +d.population * 1000);
      setData([...data, ...cdata]);
    }, []);
  });

  return <svg width={WIDTH} height={HEIGHT} ref={svgRef} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```
Above `useEffect` loads the `csv` data which is list of `country` and `population` object. After getting the data we are converting the data into `Number` with the `+` sign at the front of `d.population` which will be returned as `String` when loading. Finally we are setting the data with the `setData` hook.

Now for showing the data to the user, we will be needing another `useEffect` hook, we could update the whole data inside of the first `hook` itself but it's sole purpose is to update the component on the mounting stage alone, so the use of another hook is to update the hook based upon data changes, so this `useEffect` hook which will be having an dependency of `[data]` is to display the contents on the `SVG`, and the code for it will be looking like:

```jsx
function App() {
  ...
  useEffect(() => {
    const svg = select(svgRef.current);
		const xValue = d => d['population'];
    const yValue = d => d.country;
    
  	const xScale = scaleLinear()
    	.domain([0, max(data, xValue)])
    	.range([0, INNER_WIDTH]);
    
    const yScale = scaleBand()
    	.domain(data.map(yValue))
    	.range([0, INNER_HEIGHT])
    	.padding('0.1');
    
    const g = svg.append('g')
    	.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);
    
    g.append('g').call(axisLeft(yScale));
    g.append('g').call(axisBottom(xScale))
    	.attr('transform', `translate(0, ${INNER_HEIGHT})`);
    
    g.selectAll('rect').data(data)
    	.enter().append('rect')
    		.attr('y', d => yScale(d.country))
    		.attr('width', d => xScale(d.population))
    		.attr('height', yScale.bandwidth);
  }, [data]);
  return <svg width={WIDTH} height={HEIGHT} ref={svgRef} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```
So the final code and it's visualization is on: [React and Bar Chart Black Box Approach](https://vizhub.com/litesam/ca0adc13f15c41dd8a5c53dee1807955), however this is not the right solution because D3 will be updating the `React` component which is not the right way to be using `React`. But look at the similarities between the `D3` approach and `React` black box approach, they look same right?. So let's move on to the right approach.


## Rendering on React land

The best solution for using `D3` with `React` is to compute everything in the `D3` and make use of `React` to render, so with that we can componentize everything.

Import all the necessary functions from `React` and `D3` for your `App.js` file, also let's load the data from `data.csv` using `useEffect` hook on component mount itself, therefore the code required to do all this work is:

```jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';

import BarChart from './BarChart';

function App() {
  const [data, setData] = useState([]);
  const WIDTH = 960;
  const HEIGHT = 500;
  const margin = { top: 50, right: 40, left: 100, bottom: 50 };
  const INNER_WIDTH = WIDTH - margin.right - margin.left;
  const INNER_HEIGHT = HEIGHT - margin.top - margin.bottom;

  useEffect(() => {
    csv('data.csv').then((cdata) => {
      cdata.forEach(d => d = +d.population * 1000);
      setData([...data, ...cdata]);
    });
  }, []);

  return (
    <svg width={WIDTH} height={HEIGHT}>
    </svg>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

Also we will add the `BarChart` component which will be located in the `BarChart.js` file, we will finish writing the `BarChart` file later now we will give it some `props` from our main `App` component, so the `return` statement of `App` component will look like this:

```jsx
function App() {
  ...
  return (
    <svg>
      <BarChart
        data={data}
        xValue={xValue}
        yValue={yValue}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        leftMargin={margin.left}
        topMargin={margin.top}
      />
    </svg>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```
That is enough for making the `BarChart` but we still need to finish the `BarChart.js` file. So let's head over there and start writing some code over there:

```jsx
import React, { useRef } from 'react';
import { scaleLinear, scaleBand, axisLeft, axisBottom, select, max } from 'd3';

export function BarChart({
  data,
  xValue,
  yValue,
  innerWidth,
  innerHeight,
  leftMargin,
  topMargin
}) {
  const gAxisRef = useRef();
  const g = select(gAxisRef.current);
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding('0.1');

  g.append('g').call(axisLeft(yScale));
  g.append('g')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0, ${innerHeight})`);

  return (
    <g transform={`translate(${leftMargin}, ${topMargin})`}>
      <g ref={gAxisRef} />
      {data.map(d => (
        <rect
          y={yScale(d.country)}
          width={xScale(d.population)}
          height={yScale.bandwidth()}
        />
      ))}
    </g>
  );
}
```
You can view the final output in [my finished result](https://vizhub.com/litesam/f4f7f8525691486aa2626eeda23042e5).

## Extras with styled components

Since you can style this with any method so we will be using styled-components to style the `<rect>`, first we will install `styled-components`, so installation command is:

```shell
npm install styled-components
```

Now for styling the `<rect>`:

```jsx
import styled from 'styled-components';
const Rect = styled.rect`
  fill: steelblue;
  fill-opacity: 0.6;
  &:hover {
    fill-opacity: 1;
  }
`;
```

Finally change the `BarChart` component `return` statement to:

```jsx
function BarChart() {
  ...
  return (
    <g transform={`translate(${leftMargin}, ${topMargin})`}>
      <g ref={gAxisRef} />
      {data.map(d => (
        <Rect
          y={yScale(d.country)}
          width={xScale(d.population)}
          height={yScale.bandwidth()}
        />
      ))}
    </g>
  );
}
```

Since `styled-components` creates a new *React* component with the applied styles, it will look so cool, also you can create tooltips on hover methods. By having `onMouseOver` and `onMouseOut` events in `JS`, you can do a whole fantastic thing with this which will make your application look cooler.

## Okay we will create ToolTips also!!

In the same `BarChart.js` file let us first create styles for tooltip:

```jsx
const ToolTip = styles.foreignObject`
  background: white;
  font-size: 10px;
  text-align: left;
  div {
    box-shadow: 10px 10px 8px #888888;
  }
`;

function ToolTipWrapper({ x, y, info }) {
  return (
    <ToolTip x={x+10} y={y+10} width={200} height={100}>
      <div>
        <strong>{info.country}</strong>
        <p>Population: {info.population}</p>
      </div>
    </ToolTip>
  );
}
```

And some tweaks to your `BarChart` component, for adding `ToolTipWrapper` which will look like:

```jsx
export function BarChart({
  data,
  xValue,
  yValue,
  innerWidth,
  innerHeight,
  leftMargin,
  topMargin
}) {
  const [tools, isTools] = useState(false);
  const [toolInfo, setToolInfo] = useState({}); // new tooltip hook
  const gAxisRef = useRef();
  const g = select(gAxisRef.current);
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding('0.1');

  g.append('g').call(axisLeft(yScale));
  g.append('g')
    .call(axisBottom(xScale))
    .attr('transform', `translate(0, ${innerHeight})`);

  function mouseHover(i) {
    setToolInfo(data[i - 1]);
    isTools(true);
  }

  function mouseOut() {
    setToolInfo({});
    isTools(false);
  }

  return (
    <g transform={`translate(${leftMargin}, ${topMargin})`}>
      <g ref={gAxisRef} />
      {data.map(d => (
          <Rect
            key={d.i}
            y={yScale(d.country)}
            width={xScale(d.population)}
            height={yScale.bandwidth()}
            onMouseOver={() => mouseHover(d.i)}
            onMouseOut={() => mouseOut(d.i)}
          />
      ))}
      {tools && (
            <ToolTipWrapper
              y={yScale(toolInfo.country)}
              x={xScale(toolInfo.population)}
              info={toolInfo}
            />
          )}
    </g>
  );
}
```
Is enough to add ToolTips to your component, extra thing added to the `BarChart` component is `mouseHover` and `mouseOut` functions to add tooltips with the help of setting tooltip information by adding a new `useState` hook, which is this:
```javascript
const [toolInfo, setToolInfo] = useState({});
```

This hook is updated on the `mouseHover` and `mouseOut` events.

So the final look for the Bar Chart application will look like:

![Bar Chart with React+D3](https://i.imgur.com/8zWzGZW.gif "Bar Chart with React+D3")

Since this is React you can create multiple instance of `BarChart` component on you `App` component and you can still see your performance juice, it will be all because of *`React`* it was so fun doing this because I was learning alot of things with *D3* and its integration with *React* also it was so fun to show you guys the resources and my way of implementation of things.

## Go on then, what are you waiting for?

Also please follow [Curran Kelleher videos](https://www.youtube.com/user/currankelleher) he is so fantastic in teaching all this *D3* stuffs and also about *React* you will not be disappointed and also it is free so what are you waiting for.


## Doubts?

If you have any doubts while implementing this on your own, you can always ping me anywhere, I'll be helping you 'cos learning is cool, right?