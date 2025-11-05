import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ show: false, message: '', type: '' }); // type: 'success' | 'danger'
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setModal({ show: true, message: 'Email dan password wajib diisi', type: 'danger' });
      return;
    }

    try {
      const response = await api.post('/auth/login', form);
      localStorage.setItem('token', response.data.token);
      setModal({ show: true, message: 'Login berhasil! Mengarahkan ke dashboard...', type: 'success' });

      setTimeout(() => {
        setModal({ ...modal, show: false });
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Login gagal. Silakan coba lagi.';
      setModal({ show: true, message: msg, type: 'danger' });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }} className="p-4 shadow-sm">
        <h4 className="text-center mb-3">Login</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <InputGroup>
              <Form.Control
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="w-100">Login</Button>

          <div className="text-center mt-3">
            Belum punya akun?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>
              Register di sini
            </span>
          </div>
        </Form>
      </Card>

      {/* Modal pop-up */}
      <Modal
        show={modal.show}
        onHide={() => setModal({ ...modal, show: false })}
        centered
      >
        <Modal.Body className={`text-center text-${modal.type === 'success' ? 'success' : 'danger'}`}>
          {modal.message}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Login;