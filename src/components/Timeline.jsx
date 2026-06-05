import React, { useRef, useEffect, useState } from 'react';
import { engine } from '../audio/RemixEngine';

export default function Timeline({ tracks, onDropFile }) {
  const [playheadPos, setPlayheadPos] = useState(0);
  const zoom = 50;

  useEffect(() => {
    let animId;
    const update = () => {
      setPlayheadPos(engine.getTimelinePosition() * zoom);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleDrop = (e, trackId) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const dropX = e.clientX - rect.left - 120;
    onDropFile(trackId, e.dataTransfer.files[0], Math.max(0, dropX / zoom));
  };

  return (
    <div className="timeline-container">
      <div className="playhead" style={{ left: `${120 + playheadPos}px` }} />
      {tracks.map((track, i) => (
        <div key={i} className="track" onDragOver={e => e.preventDefault()} onDrop={e => handleDrop(e, i)}>
          <div className="track-label"><span className="text-xs font-bold text-white">{track.name}</span></div>
          <div className="ml-[120px] h-full relative">
            {track.clips.map((clip, j) => (
              <div key={j} className="absolute h-[70%] top-[15%] bg-primary/20 border border-primary/50 rounded" style={{ left: `${clip.startTime * zoom}px`, width: `${clip.duration * zoom}px` }}>
                <div className="text-[9px] p-1 text-white truncate">{clip.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
