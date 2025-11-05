import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modal, setModal] = useState({ show: false, message: '', type: '' }); // type: 'success' | 'danger'
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setModal({ show: true, message: 'Semua field wajib diisi', type: 'danger' });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setModal({ show: true, message: 'Konfirmasi password tidak cocok', type: 'danger' });
      return;
    }

    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setModal({ show: true, message: 'Registrasi berhasil! Mengarahkan ke login...', type: 'success' });

      setTimeout(() => {
        setModal({ ...modal, show: false });
        navigate('/login');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
      setModal({ show: true, message: msg, type: 'danger' });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }} className="p-4 shadow-sm">
        <h4 className="text-center mb-3">Register</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>

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

          <Form.Group className="mb-3">
            <InputGroup>
              <Form.Control
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Konfirmasi Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="w-100">Register</Button>

          <div className="text-center mt-3">
            Sudah punya akun?{' '}
            <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>
              Login di sini
            </span>
          </div>
        </Form>
      </Card>

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

export default Register;