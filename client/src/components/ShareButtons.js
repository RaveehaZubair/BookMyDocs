import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
//import './ShareButtons.css'; // Optional CSS file

function ShareButtons({ shareUrl, title, description }) {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=<span class="math-inline">\{encodeURIComponent\(shareUrl\)\}&text\=</span>{encodeURIComponent(title + ' - ' + description)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=<span class="math-inline">\{encodeURIComponent\(shareUrl\)\}&title\=</span>{encodeURIComponent(title)}&summary=<span class="math-inline">\{encodeURIComponent\(description\)\}&source\=</span>{encodeURIComponent(window.location.origin)}`;

  return (
    <div className="share-buttons">
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
      </a>
      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
        <FontAwesomeIcon icon={faTwitterSquare} size="2x" />
      </a>
      <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
    </div>
  );
}

export default ShareButtons;