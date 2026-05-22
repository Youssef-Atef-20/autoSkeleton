import { HEADINGS, TEXT, MEDIA, ACTIONS } from '../constants/elementMap';

export default function detectType(node) {
  if (!node) return null;

  // Handle plain text nodes
  if (typeof node === 'string' || typeof node === 'number') {
    return 'text';
  }

  // Handle React elements
  if (node.type && typeof node.type === 'string') {
    const tag = node.type.toLowerCase();
    const props = node.props || {};
    const className = props.className || '';
    const style = props.style || {};

    // Support manual overrides via data attributes
    if (props['data-skeleton']) {
      return props['data-skeleton'];
    }

    // Explicitly check for ignore flag
    if (props['data-skeleton-ignore'] === 'true' || props['data-skeleton-ignore'] === true) {
      return 'ignore';
    }

    // Check for circular avatar class patterns or styles
    const isCircular = 
      className.includes('avatar') || 
      className.includes('rounded-full') || 
      className.includes('circle') || 
      className.includes('round') ||
      style.borderRadius === '50%' ||
      style.borderRadius === '9999px';

    if (tag === 'img' && isCircular) {
      return 'circle';
    }

    if (HEADINGS.has(tag)) {
      return 'heading';
    }

    if (TEXT.has(tag)) {
      return 'text';
    }

    if (MEDIA.has(tag)) {
      return isCircular ? 'circle' : 'image';
    }

    if (tag === 'button') {
      return 'button';
    }

    if (ACTIONS.has(tag)) {
      return 'input';
    }

    // For any container element styled explicitly as a circular image/avatar
    if (isCircular && (className.includes('avatar') || className.includes('profile-pic'))) {
      return 'circle';
    }
  }

  return null;
}
