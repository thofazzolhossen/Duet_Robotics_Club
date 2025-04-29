import img from '../../img/drclogo.png'
export const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#0a9396',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
    }}
  >
    <div
      style={{
        position: 'relative',
        width: '150px',
        height: '150px',
      }}
    >
      {/* Rotating border */}
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '10px solid rgb(209, 205, 197)',
          borderTop: '10px solid rgb(255, 255, 255)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      {/* Fixed image in the center */}
      <img
        src={img} // Replace with your image URL
        alt="Loader Icon"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%', // Adjust size as needed
          height: '60%',
        }}
      />
    </div>
    <style>
      {`@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`}
    </style>
  </div>
);
