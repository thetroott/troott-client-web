import React from 'react';


interface TroottHeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<TroottHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="troott-header">
      <button className="how-it-works">
        <img src="how-it-works-icon.svg" alt="How It Works Icon" className="icon" />
        HOW IT WORKS
      </button>
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default Header;