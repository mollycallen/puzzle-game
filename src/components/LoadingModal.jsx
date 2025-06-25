function LoadingModal({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <p>Loading image...</p>
      </div>
    </div>
  );
}

export default LoadingModal;
