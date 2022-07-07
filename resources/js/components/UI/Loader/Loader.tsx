// React
import React from 'react'

// Third-party
import ContentLoader from 'react-content-loader'

const Loader: React.FC = (props) => (
    <ContentLoader
        speed={1}
        width='100%'
        height={500}
        viewBox="0 0 900 500"
        backgroundColor="#f7f8fa"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="82" rx="10" ry="10" width="252" height="41" />
        <rect x="0" y="0" rx="15" ry="15" width="900" height="65" />
        {/* eslint-disable-next-line max-len */}
        <path d="M 0 216.774 c 0 -5.522 4.477 -10 10 -10 h 880 c 5.523 0 10 4.478 10 10 v 30.71 c 0 5.523 -4.477 10 -10 10 H 10 c -5.523 0 -10 -4.477 -10 -10 v -30.71 z M 0 338.479 c 0 -5.523 4.477 -10 10 -10 h 880 c 5.523 0 10 4.477 10 10 v 30.709 c 0 5.523 -4.477 10 -10 10 H 10 c -5.523 0 -10 -4.477 -10 -10 v -30.709 z M 0 277.627 c 0 -5.523 4.477 -10 10 -10 h 880 c 5.523 0 10 4.477 10 10 v 30.71 c 0 5.523 -4.477 10 -10 10 H 10 c -5.523 0 -10 -4.477 -10 -10 v -30.71 z M 0 464.24 c 0 -5.523 4.477 -10 10 -10 h 880 c 5.523 0 10 4.477 10 10 v 30.71 c 0 5.523 -4.477 10 -10 10 H 10 c -5.523 0 -10 -4.477 -10 -10 v -30.71 z M 0 399.33 c 0 -5.523 4.477 -10 10 -10 h 880 c 5.523 0 10 4.477 10 10 v 30.71 c 0 5.523 -4.477 10 -10 10 H 10 c -5.523 0 -10 -4.477 -10 -10 v -30.71 z" />
        <rect x="260" y="82" rx="8" ry="8" width="135" height="41" />
        <rect x="734" y="82" rx="15" ry="15" width="166" height="41" />
        <rect x="0" y="164" rx="10" ry="10" width="180" height="28" />
        <rect x="238" y="164" rx="10" ry="10" width="118" height="28" />
        <rect x="409" y="164" rx="10" ry="10" width="118" height="28" />
        <rect x="0" y="556" rx="10" ry="10" width="48" height="24" />
        <rect x="709" y="556" rx="10" ry="10" width="191" height="24" />
    </ContentLoader>
)

export default Loader
