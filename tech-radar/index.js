/* global d3 */

(() => {
  'use strict';

  // The MIT License (MIT)
  //
  // Copyright (c) 2017-2024 Zalando SE
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  //
  // The above copyright notice and this permission notice shall be included in
  // all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  // THE SOFTWARE.

  function radar_visualization(config) {
    const cfg = config;

    cfg.svg_id = cfg.svg_id || cfg.svg || 'radar';
    cfg.width = cfg.width || 1450;
    cfg.height = cfg.height || 1000;
    cfg.colors = Object.prototype.hasOwnProperty.call(cfg, 'colors')
      ? cfg.colors
      : {
          background: '#fff',
          grid: '#dddde0',
          inactive: '#ddd',
        };
    cfg.print_layout = Object.prototype.hasOwnProperty.call(cfg, 'print_layout')
      ? cfg.print_layout
      : true;
    cfg.links_in_new_tabs = Object.prototype.hasOwnProperty.call(cfg, 'links_in_new_tabs')
      ? cfg.links_in_new_tabs
      : true;
    cfg.repo_url = cfg.repo_url || '#';
    cfg.print_ring_descriptions_table = Object.prototype.hasOwnProperty.call(
      cfg,
      'print_ring_descriptions_table',
    )
      ? cfg.print_ring_descriptions_table
      : false;
    cfg.font_family = cfg.font_family || 'Arial, Helvetica';
    cfg.overlay_panel_width = cfg.overlay_panel_width || 236;
    cfg.overlay_line_height = cfg.overlay_line_height || 16;
    cfg.overlay_section_gap = cfg.overlay_section_gap || 20;
    cfg.overlay_title_gap = cfg.overlay_title_gap || 28;
    cfg.overlay_column_gap = cfg.overlay_column_gap || 28;
    cfg.overlay_margin = cfg.overlay_margin || 32;
    cfg.overlay_vertical_spacing = cfg.overlay_vertical_spacing || 32;
    cfg.overlay_circle_gap = cfg.overlay_circle_gap || 32;

    let seed = cfg.seed || 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const random_between = (min, max) => min + random() * (max - min);
    const normal_between = (min, max) => min + (random() + random()) * 0.5 * (max - min);

    const quadrants = [
      { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
      { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
      { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
      { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 },
    ];

    const ringDistances = [
      { radius: 130 },
      { radius: 220 },
      { radius: 310 },
      { radius: 400 },
    ];

    const outerRadius = ringDistances[ringDistances.length - 1].radius;

    const polar = (point) => ({
      t: Math.atan2(point.y, point.x),
      r: Math.sqrt(point.x * point.x + point.y * point.y),
    });

    const cartesian = (p) => ({
      x: p.r * Math.cos(p.t),
      y: p.r * Math.sin(p.t),
    });

    const bounded_interval = (value, min, max) => {
      const low = Math.min(min, max);
      const high = Math.max(min, max);
      return Math.min(Math.max(value, low), high);
    };

    const bounded_ring = (p, r_min, r_max) => ({
      t: p.t,
      r: bounded_interval(p.r, r_min, r_max),
    });

    const bounded_box = (point, min, max) => ({
      x: bounded_interval(point.x, min.x, max.x),
      y: bounded_interval(point.y, min.y, max.y),
    });

    function segment(quadrant, ring) {
      const ringRadius = ringDistances[ring].radius;
      const innerRadius = ring === 0 ? 30 : ringDistances[ring - 1].radius;
      const polar_min = {
        t: quadrants[quadrant].radial_min * Math.PI,
        r: innerRadius,
      };
      const polar_max = {
        t: quadrants[quadrant].radial_max * Math.PI,
        r: ringRadius,
      };
      const padding = 15;
      const cartesian_min = {
        x: padding * quadrants[quadrant].factor_x,
        y: padding * quadrants[quadrant].factor_y,
      };
      const cartesian_max = {
        x: ringDistances[3].radius * quadrants[quadrant].factor_x,
        y: ringDistances[3].radius * quadrants[quadrant].factor_y,
      };
      return {
        clipx(d) {
          const c = bounded_box(d, cartesian_min, cartesian_max);
          const p = bounded_ring(polar(c), polar_min.r + padding, polar_max.r - padding);
          d.x = cartesian(p).x;
          return d.x;
        },
        clipy(d) {
          const c = bounded_box(d, cartesian_min, cartesian_max);
          const p = bounded_ring(polar(c), polar_min.r + padding, polar_max.r - padding);
          d.y = cartesian(p).y;
          return d.y;
        },
        random() {
          return cartesian({
            t: random_between(polar_min.t, polar_max.t),
            r: normal_between(polar_min.r, polar_max.r),
          });
        },
      };
    }

    cfg.entries.forEach((entry) => {
      const seg = segment(entry.quadrant, entry.ring);
      const point = seg.random();
      entry.segment = seg;
      entry.x = point.x;
      entry.y = point.y;
      entry.color = entry.active !== false || cfg.print_layout
        ? cfg.rings[entry.ring].color
        : cfg.colors.inactive;
    });

    const segmented = Array.from({ length: quadrants.length }, () =>
      Array.from({ length: ringDistances.length }, () => []),
    );
    cfg.entries.forEach((entry) => {
      segmented[entry.quadrant][entry.ring].push(entry);
    });

    let id = 1;
    const legendOrder = cfg.legend_order || [2, 3, 1, 0];
    legendOrder.forEach((quadrantIndex) => {
      for (let ringIndex = 0; ringIndex < ringDistances.length; ringIndex += 1) {
        const entries = segmented[quadrantIndex][ringIndex];
        entries.sort((a, b) => a.label.localeCompare(b.label));
        entries.forEach((entry) => {
          entry.id = String(id);
          id += 1;
        });
      }
    });

    const translate = (x, y) => `translate(${x},${y})`;

    const viewbox = (quadrant) => [
      Math.max(0, quadrants[quadrant].factor_x * 400) - 420,
      Math.max(0, quadrants[quadrant].factor_y * 400) - 420,
      440,
      440,
    ].join(' ');

    const svg = d3
      .select(`svg#${cfg.svg_id}`)
      .attr('width', cfg.width)
      .attr('height', cfg.height)
      .style('background-color', cfg.colors.background);

    const radar = svg.append('g');
    if (Object.prototype.hasOwnProperty.call(cfg, 'zoomed_quadrant')) {
      svg.attr('viewBox', viewbox(cfg.zoomed_quadrant));
    } else {
      radar.attr('transform', translate(cfg.width / 2, cfg.height / 2));
    }

    const grid = radar.append('g');

    grid
      .append('line')
      .attr('x1', 0)
      .attr('y1', -400)
      .attr('x2', 0)
      .attr('y2', 400)
      .style('stroke', cfg.colors.grid)
      .style('stroke-width', 1);

    grid
      .append('line')
      .attr('x1', -400)
      .attr('y1', 0)
      .attr('x2', 400)
      .attr('y2', 0)
      .style('stroke', cfg.colors.grid)
      .style('stroke-width', 1);

    const defs = grid.append('defs');
    const filter = defs
      .append('filter')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 1)
      .attr('height', 1)
      .attr('id', 'solid');
    filter.append('feFlood').attr('flood-color', 'rgb(0, 0, 0, 0.8)');
    filter.append('feComposite').attr('in', 'SourceGraphic');

    ringDistances.forEach((ring, index) => {
      grid
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', ring.radius)
        .style('fill', 'none')
        .style('stroke', cfg.colors.grid)
        .style('stroke-width', 1);

      if (cfg.print_layout) {
        grid
          .append('text')
          .text(cfg.rings[index].name)
          .attr('y', -ring.radius + 62)
          .attr('text-anchor', 'middle')
          .style('fill', cfg.rings[index].color)
          .style('opacity', 0.35)
          .style('font-family', cfg.font_family)
          .style('font-size', '42px')
          .style('font-weight', 'bold')
          .style('pointer-events', 'none')
          .style('user-select', 'none');
      }
    });


    const rink = radar.append('g').attr('id', 'rink');

    const bubble = radar
      .append('g')
      .attr('id', 'bubble')
      .attr('x', 0)
      .attr('y', 0)
      .style('opacity', 0)
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    bubble.append('rect').attr('rx', 4).attr('ry', 4).style('fill', '#333');
    const bubbleText = bubble
      .append('text')
      .style('font-family', cfg.font_family)
      .style('font-size', '10px')
      .style('fill', '#fff');
    bubble.append('path').attr('d', 'M 0,0 10,0 5,8 z').style('fill', '#333');

    function showBubble(d) {
      if (d.active || cfg.print_layout) {
        bubble.raise();
        bubbleText.text(d.label);
        const bbox = bubbleText.node().getBBox();
        bubble
          .attr('transform', translate(d.x - bbox.width / 2, d.y - 16))
          .style('opacity', 0.8);
        bubble
          .select('rect')
          .attr('x', -5)
          .attr('y', -bbox.height)
          .attr('width', bbox.width + 10)
          .attr('height', bbox.height + 4);
        bubble.select('path').attr('transform', translate(bbox.width / 2 - 5, 3));
      }
    }

    function hideBubble() {
      bubble.attr('transform', translate(0, 0)).style('opacity', 0);
    }

    function highlightLegendItem(d) {
      const legendItem = document.getElementById(`legendItem${d.id}`);
      if (!legendItem) {
        return;
      }
      if (legendItem instanceof SVGElement) {
        legendItem.setAttribute('font-weight', '600');
      } else {
        legendItem.classList.add('radar-legend-highlight');
      }
    }

    function unhighlightLegendItem(d) {
      const legendItem = document.getElementById(`legendItem${d.id}`);
      if (!legendItem) {
        return;
      }
      if (legendItem instanceof SVGElement) {
        legendItem.removeAttribute('font-weight');
      } else {
        legendItem.classList.remove('radar-legend-highlight');
      }
    }

    function renderQuadrantPanels() {
      const margin = cfg.overlay_margin;
      const circleGap = cfg.overlay_circle_gap;
      const verticalSpacing = cfg.overlay_vertical_spacing;
      const baseLeftX = -outerRadius - cfg.overlay_panel_width - circleGap;
      const baseRightX = outerRadius + circleGap;
      const leftLimit = -cfg.width / 2 + margin;
      const rightLimit = cfg.width / 2 - cfg.overlay_panel_width - margin;

      const defaultRows = cfg.overlay_quadrant_layout || [
        [1, 0],
        [2, 3],
      ];

      let leftX = Math.max(leftLimit, baseLeftX);
      let rightX = Math.min(rightLimit, baseRightX);

      const leftGap = -outerRadius - (leftX + cfg.overlay_panel_width);
      const rightGap = rightX - outerRadius;

      let useSingleColumn =
        leftGap < circleGap ||
        rightGap < circleGap ||
        rightX - leftX < cfg.overlay_panel_width + margin;

      let columns;
      let rows = defaultRows;

      if (useSingleColumn) {
        const preferredRight = outerRadius + circleGap;
        const singleX = Math.min(rightLimit, Math.max(leftLimit, preferredRight));
        columns = [singleX];
        rows = cfg.overlay_single_column_layout || [[1], [0], [2], [3]];
      } else {
        columns = [leftX, rightX];
      }

      const topY = -outerRadius + margin;
      const panels = radar.append('g').attr('id', 'radar-panel-overlay');

      function createPanel(quadrantIndex, columnIndex, y) {
        if (quadrantIndex == null || quadrantIndex < 0 || quadrantIndex >= cfg.quadrants.length) {
          return 0;
        }

        const columnX = columns[Math.min(columnIndex, columns.length - 1)];

        const panel = panels
          .append('g')
          .attr('class', 'radar-quadrant-panel')
          .attr('transform', translate(columnX, y));

        panel
          .append('text')
          .attr('class', 'radar-panel-title')
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'start')
          .attr('dominant-baseline', 'hanging')
          .style('font-family', cfg.font_family)
          .style('font-size', '18px')
          .style('font-weight', 'bold')
          .style('fill', '#0f172a')
          .text(cfg.quadrants[quadrantIndex].name);

        const columnWidth = (cfg.overlay_panel_width - cfg.overlay_column_gap) / 2;
        const textColumns = [
          { x: 0, y: cfg.overlay_title_gap },
          { x: columnWidth + cfg.overlay_column_gap, y: cfg.overlay_title_gap },
        ];

        cfg.rings.forEach((ring, ringIndex) => {
          const ringEntries = segmented[quadrantIndex][ringIndex];
          if (!ringEntries.length) {
            return;
          }

          const textColumn = textColumns[ringIndex % textColumns.length];
          let localY = textColumn.y;

          panel
            .append('text')
            .attr('class', 'radar-panel-ring')
            .attr('x', textColumn.x)
            .attr('y', localY)
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .style('font-family', cfg.font_family)
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .style('letter-spacing', '0.08em')
            .style('text-transform', 'uppercase')
            .style('fill', ring.color)
            .text(ring.name);

          localY += cfg.overlay_line_height;

          ringEntries.forEach((entry) => {
            const entryText = panel
              .append('text')
              .attr('id', `legendItem${entry.id}`)
              .attr('class', 'radar-panel-entry')
              .attr('x', textColumn.x)
              .attr('y', localY)
              .attr('text-anchor', 'start')
              .attr('dominant-baseline', 'hanging')
              .style('font-family', cfg.font_family)
              .style('font-size', '12px')
              .style('fill', '#334155')
              .style('cursor', entry.link ? 'pointer' : 'default')
              .text(`${entry.id}. ${entry.label}`)
              .on('mouseover', () => {
                showBubble(entry);
                highlightLegendItem(entry);
              })
              .on('mouseout', () => {
                hideBubble(entry);
                unhighlightLegendItem(entry);
              })
              .on('focus', () => {
                showBubble(entry);
                highlightLegendItem(entry);
              })
              .on('blur', () => {
                hideBubble(entry);
                unhighlightLegendItem(entry);
              });

            if (entry.link) {
              entryText
                .attr('tabindex', 0)
                .attr('role', 'link')
                .attr('aria-label', `${entry.label} (${ring.name})`)
                .on('click', () => {
                  if (cfg.links_in_new_tabs) {
                    window.open(entry.link, '_blank', 'noopener');
                  } else {
                    window.location.href = entry.link;
                  }
                })
                .on('keydown', (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    if (cfg.links_in_new_tabs) {
                      window.open(entry.link, '_blank', 'noopener');
                    } else {
                      window.location.href = entry.link;
                    }
                  }
                });
            }

            localY += cfg.overlay_line_height;
          });

          textColumn.y = localY + cfg.overlay_section_gap;
        });

        const bbox = panel.node().getBBox();
        return bbox ? bbox.height : 0;
      }

      const layoutRows = rows.length ? rows : [[1, 0], [2, 3]];
      let currentY = topY;

      layoutRows.forEach((row, rowIndex) => {
        const quadrants = Array.isArray(row) ? row : [row];
        const heights = quadrants.map((quadrantIndex, columnIndex) =>
          createPanel(quadrantIndex, columnIndex, currentY),
        );
        const rowHeight = heights.length ? Math.max(...heights) : 0;
        if (rowIndex < layoutRows.length - 1) {
          currentY += rowHeight + verticalSpacing;
        }
      });
    }


    const blips = rink
      .selectAll('.blip')
      .data(cfg.entries)
      .enter()
      .append('g')
      .attr('class', 'blip')
      .attr('transform', (d) => translate(d.x, d.y))
      .on('mouseover', (event, d) => {
        showBubble(d);
        highlightLegendItem(d);
      })
      .on('mouseout', (event, d) => {
        hideBubble(d);
        unhighlightLegendItem(d);
      });

    blips.each(function configureBlip(d) {
      let blip = d3.select(this);

      if (d.active && Object.prototype.hasOwnProperty.call(d, 'link') && d.link) {
        blip = blip
          .append('a')
          .attr('xlink:href', d.link)
          .attr('target', cfg.links_in_new_tabs ? '_blank' : null);
      }

      if (d.moved === 1) {
        blip
          .append('path')
          .attr('d', 'M -11,5 11,5 0,-13 z')
          .style('fill', d.color);
      } else if (d.moved === -1) {
        blip
          .append('path')
          .attr('d', 'M -11,-5 11,-5 0,13 z')
          .style('fill', d.color);
      } else if (d.moved === 2) {
        const star = d3.symbol().type(d3.symbolStar).size(200);
        blip
          .append('path')
          .attr('d', star)
          .attr('transform', 'translate(0, 1)')
          .style('fill', d.color);
      } else {
        blip.append('circle').attr('r', 9).attr('fill', d.color);
      }

      if (d.active || cfg.print_layout) {
        const labelText = cfg.print_layout ? d.id : (d.label.match(/[a-z]/i) || [''])[0];
        blip
          .append('text')
          .text(labelText)
          .attr('y', 3)
          .attr('text-anchor', 'middle')
          .style('fill', '#fff')
          .style('font-family', cfg.font_family)
          .style('font-size', labelText.length > 2 ? '8px' : '9px')
          .style('pointer-events', 'none')
          .style('user-select', 'none');
      }
    });

    function ticked() {
      blips.attr('transform', (d) => translate(d.segment.clipx(d), d.segment.clipy(d)));
    }

    d3
      .forceSimulation()
      .nodes(cfg.entries)
      .velocityDecay(0.19)
      .force('collision', d3.forceCollide().radius(12).strength(0.85))
      .on('tick', ticked);

    renderQuadrantPanels();

    function ringDescriptionsTable() {
      const table = d3
        .select('body')
        .append('table')
        .attr('class', 'radar-table')
        .style('border-collapse', 'collapse')
        .style('position', 'relative')
        .style('top', '-70px')
        .style('margin-left', '50px')
        .style('margin-right', '50px')
        .style('font-family', cfg.font_family)
        .style('font-size', '13px')
        .style('text-align', 'left');

      const thead = table.append('thead');
      const tbody = table.append('tbody');

      const columnWidth = `${100 / cfg.rings.length}%`;

      const headerRow = thead.append('tr').style('border', '1px solid #ddd');

      headerRow
        .selectAll('th')
        .data(cfg.rings)
        .enter()
        .append('th')
        .style('padding', '8px')
        .style('border', '1px solid #ddd')
        .style('background-color', (d) => d.color)
        .style('color', '#fff')
        .style('width', columnWidth)
        .text((d) => d.name);

      const descriptionRow = tbody.append('tr').style('border', '1px solid #ddd');

      descriptionRow
        .selectAll('td')
        .data(cfg.rings)
        .enter()
        .append('td')
        .style('padding', '8px')
        .style('border', '1px solid #ddd')
        .style('width', columnWidth)
        .text((d) => d.description || '');
    }

    if (cfg.print_ring_descriptions_table) {
      ringDescriptionsTable();
    }

    return {
      quadrants: cfg.quadrants,
      rings: cfg.rings,
      entries: cfg.entries,
      segmented,
    };
  }


  const RAW_RADAR_ENTRIES = Object.freeze([
    { quadrant: 0, ring: 0, label: 'AWS Bedrock', active: true, moved: 0 },
    { quadrant: 0, ring: 1, label: 'GitHub Copilot', active: true, moved: -1 },
    { quadrant: 0, ring: 0, label: 'Claude Code', active: true, moved: 1 },
    { quadrant: 0, ring: 0, label: 'OpenAI Codex', active: true, moved: 1 },
    { quadrant: 0, ring: 0, label: 'MCP', active: true, moved: 1 },
    { quadrant: 2, ring: 0, label: 'AWS DynamoDB', active: true, moved: 0 },
    { quadrant: 2, ring: 0, label: 'AWS S3', active: true, moved: 0 },
    { quadrant: 2, ring: 3, label: 'MongoDB', active: true, moved: -1 },
    { quadrant: 2, ring: 0, label: 'Elasticsearch', active: true, moved: 0 },
    { quadrant: 2, ring: 0, label: 'Snowflake', active: true, moved: 1 },
    { quadrant: 2, ring: 0, label: 'AWS Aurora', active: true, moved: 1 },
    { quadrant: 2, ring: 3, label: 'AWS Glue', active: true, moved: -1 },
    { quadrant: 1, ring: 0, label: 'AWS Athena', active: true, moved: 0 },
    { quadrant: 1, ring: 0, label: 'AWS CloudFront', active: true, moved: 0 },
    { quadrant: 1, ring: 0, label: 'AWS Fargate', active: true, moved: 0 },
    { quadrant: 0, ring: 0, label: 'AWS SageMaker', active: true, moved: 1 },
    { quadrant: 0, ring: 0, label: 'Azure OpenAI', active: true, moved: 1 },
    { quadrant: 1, ring: 3, label: 'AWS AppSync', active: true, moved: -1 },
    { quadrant: 1, ring: 3, label: 'Amazon EFS', active: true, moved: -1 },
    { quadrant: 1, ring: 0, label: 'AWS API Gateway', active: true, moved: 0 },
    { quadrant: 1, ring: 0, label: 'CircleCI', active: true, moved: 0 },
    { quadrant: 1, ring: 0, label: 'Auth0', active: true, moved: 0 },
    { quadrant: 1, ring: 0, label: 'OpenTofu', active: true, moved: 0 },
    { quadrant: 1, ring: 0, label: 'AWS Lambda', active: true, moved: 0 },
    { quadrant: 3, ring: 0, label: 'React', active: true, moved: 0 },
    { quadrant: 3, ring: 3, label: 'Vue.js', active: true, moved: -1 },
    { quadrant: 3, ring: 0, label: 'Next.js', active: true, moved: 0 },
    { quadrant: 3, ring: 3, label: 'Meteor.js', active: true, moved: -1 },
    { quadrant: 3, ring: 0, label: 'Serverless', active: true, moved: 0 },
    { quadrant: 3, ring: 0, label: 'Storybook', active: true, moved: 0 },
    { quadrant: 3, ring: 3, label: 'GraphQL', active: true, moved: 1 },
    { quadrant: 1, ring: 0, label: 'AWS Step Functions', active: true, moved: 1 },
    { quadrant: 1, ring: 0, label: 'AWS SNS/SQS', active: true, moved: 0 },
    { quadrant: 1, ring: 1, label: 'AWS Kinesis', active: true, moved: -1 },
    { quadrant: 3, ring: 0, label: 'Styled Components', active: true, moved: 1 },
    { quadrant: 3, ring: 0, label: 'SWR', active: true, moved: 0 },
    { quadrant: 3, ring: 2, label: 'Tailwind', active: false, moved: 1 },
    { quadrant: 3, ring: 2, label: 'Radix', active: true, moved: 1 },
    { quadrant: 3, ring: 1, label: 'Shadcn', active: false, moved: 1 },
    { quadrant: 3, ring: 3, label: 'Less(css)', active: false, moved: 1 },
    { quadrant: 3, ring: 3, label: 'Froala', active: true, moved: -1 },
    { quadrant: 3, ring: 3, label: 'Redux', active: true, moved: -1 },
    { quadrant: 3, ring: 0, label: 'testing-library', active: true, moved: 0 },
    { quadrant: 3, ring: 3, label: 'react-scripts', active: false, moved: -1 },
    { quadrant: 3, ring: 0, label: 'jest', active: true, moved: 0 },
    { quadrant: 3, ring: 3, label: 'lodash', active: true, moved: -1 },
    { quadrant: 1, ring: 3, label: 'Yarn classic', active: true, moved: -1 },
    { quadrant: 3, ring: 0, label: 'pnpm', active: true, moved: 1 },
    { quadrant: 2, ring: 1, label: 'AWS ValKey', active: true, moved: 1 },
    { quadrant: 2, ring: 3, label: 'AWS Neptune', active: true, moved: -1 },
  ]);

  const BASE_RADAR_CONFIG = {
    svg_id: 'radar',
    colors: {
      background: 'transparent',
      grid: '#cbd5f5',
      inactive: '#e2e8f0',
    },
    title: 'Shelf Tech Radar — 2025.06',
    date: '',
    quadrants: [
      { name: 'AI/ML' },
      { name: 'Infrastructure' },
      { name: 'Data' },
      { name: 'Frameworks & Libraries' },
    ],
    rings: [
      { name: 'Adopt', color: '#34d399' },
      { name: 'Trial', color: '#38bdf8' },
      { name: 'Assess', color: '#fbbf24' },
      { name: 'Hold', color: '#f87171' },
    ],
    print_layout: true,
    links_in_new_tabs: true,
    repo_url: 'https://github.com/shelfio/tech-radar.github.io',
  };

  const RADAR_MAX_WIDTH = 1400;
  const RADAR_MIN_WIDTH = 720;
  const RADAR_HORIZONTAL_PADDING = 120;

  let resizeTimer;

  function renderRadar() {
    const svgElement = document.getElementById(BASE_RADAR_CONFIG.svg_id);
    if (!svgElement) {
      return;
    }

    const width = Math.max(
      RADAR_MIN_WIDTH,
      Math.min(RADAR_MAX_WIDTH, window.innerWidth - RADAR_HORIZONTAL_PADDING),
    );
    const height = Math.round(width * 0.75);

    d3.select(svgElement).selectAll('*').remove();

    const config = {
      ...BASE_RADAR_CONFIG,
      width,
      height,
      entries: RAW_RADAR_ENTRIES.map((entry) => ({ ...entry })),
    };

    radar_visualization(config);
  }

  renderRadar();

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(renderRadar, 200);
  });
})();
