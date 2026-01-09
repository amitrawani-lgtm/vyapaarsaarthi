import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('App', () => {
    it('renders dashboard by default', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    });
});
