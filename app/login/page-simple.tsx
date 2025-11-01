export default function LoginPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1E1B4B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <div style={{ 
        background: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ color: '#1E1B4B', marginBottom: '2rem', fontSize: '2rem' }}>Login</h1>
        <form action="/dashboard" method="get">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#1E1B4B', display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ccc',
                borderRadius: '0.5rem'
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#1E1B4B', display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ccc',
                borderRadius: '0.5rem'
              }}
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#E31E24',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
