import React from 'react';
import { Box, Typography } from '@mui/material';

interface CustomLinkProps {
  loading: boolean;
  preview: {
    domain: string;
    title: string;
    description: string;
    url: string;
    img: string;
    size: string;
  };
}

function CustomLink({ loading, preview }: CustomLinkProps) {
  const aspectRatio = 3 / 2;
  
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        p: 2,
      }}
    >
      <a href={preview.url} target="_blank" rel="noopener noreferrer">
        <div style={{ maxWidth: preview.size, position: 'relative', paddingBottom: `${100 / aspectRatio}%`, overflow: 'hidden' }}>
          <img alt={preview.title} src={preview.img} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </a>
      <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
        {preview.title}
      </Typography>
      {preview.description && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {preview.description}
        </Typography>
      )}
    </Box>
  );
}

export default CustomLink;
