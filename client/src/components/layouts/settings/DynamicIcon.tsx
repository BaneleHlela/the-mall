import React from 'react';
import * as Icons from '@mui/icons-material';

interface IconProps {
  name: string;
}

const DynamicIcon: React.FC<IconProps> = ({ name }) => {
  const IconComponent = Icons[name as keyof typeof Icons];

  if (!IconComponent) {
    console.error(`Icon "${name}" 
    not found in Material UI`);
    return null;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "-2px"}}>
      <IconComponent style={{fontSize: "inherit"}} />
    </div>
  );
};


export default DynamicIcon