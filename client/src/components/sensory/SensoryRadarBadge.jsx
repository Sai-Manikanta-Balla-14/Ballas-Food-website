import React from "react";

export const SensoryRadarBadge = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="sensory-meter-group">
      {profile.sweetness > 0 && (
        <div className="sensory-metric-row">
          <span>🍯 Sweetness Index:</span>
          <div className="sensory-dots">
            {[1, 2, 3, 4, 5].map(lvl => (
              <div
                key={lvl}
                className={`sensory-dot ${lvl <= profile.sweetness ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      )}

      {profile.crispness > 0 && (
        <div className="sensory-metric-row">
          <span>✨ Crunch & Crispness:</span>
          <div className="sensory-dots">
            {[1, 2, 3, 4, 5].map(lvl => (
              <div
                key={lvl}
                className={`sensory-dot ${lvl <= profile.crispness ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      )}

      {profile.gheeRichness > 0 && (
        <div className="sensory-metric-row">
          <span>🧈 Pure Ghee Texture:</span>
          <div className="sensory-dots">
            {[1, 2, 3, 4, 5].map(lvl => (
              <div
                key={lvl}
                className={`sensory-dot ${lvl <= profile.gheeRichness ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      )}

      {profile.spiceHeat > 0 && (
        <div className="sensory-metric-row">
          <span>🌶️ Spice & Tang Punch:</span>
          <div className="sensory-dots">
            {[1, 2, 3, 4, 5].map(lvl => (
              <div
                key={lvl}
                className={`sensory-dot ${lvl <= profile.spiceHeat ? "active-spice" : ""}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
