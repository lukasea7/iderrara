import React, { useMemo } from 'react';
import { describeLogo } from '../logo';

function renderElement(el, i) {
  switch (el.type) {
    case 'circle':
      return <circle key={i} cx={el.cx} cy={el.cy} r={el.r} fill={el.fill} stroke={el.stroke} strokeWidth={el.strokeWidth} />;
    case 'rect':
      return <rect key={i} x={el.x} y={el.y} width={el.width} height={el.height} rx={el.rx} fill={el.fill} stroke={el.stroke} strokeWidth={el.strokeWidth} />;
    case 'path':
      return <path key={i} d={el.d} transform={el.transform || undefined} fill={el.fill} stroke={el.stroke} strokeWidth={el.strokeWidth} />;
    case 'line':
      return <line key={i} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} stroke={el.stroke} strokeWidth={el.strokeWidth} strokeLinecap="round" />;
    case 'text':
      return (
        <text
          key={i}
          x={el.x}
          y={el.y}
          fontFamily={el.family}
          fontSize={el.size}
          fontWeight={el.weight}
          letterSpacing={el.letterSpacing}
          textAnchor={el.anchor}
          fill={el.fill}
          fillOpacity={el.opacity}
        >
          {el.text}
        </text>
      );
    default:
      return null;
  }
}

export default function Logo({ config, description, className }) {
  const desc = useMemo(() => description || describeLogo(config), [config, description]);
  const { x, y, w, h } = desc.viewBox;
  const label = `Logomarca ${(config && config.text) || ''}`.trim();
  return (
    <svg
      className={className}
      viewBox={`${x} ${y} ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      {desc.background && <rect x={x} y={y} width={w} height={h} fill={desc.background} />}
      {desc.elements.map(renderElement)}
    </svg>
  );
}
