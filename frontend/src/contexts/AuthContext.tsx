import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from 'next/router';
import { toast } from "react-toastify";
import { api } from "../services/apiCliente";

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
    forgotPass: (credentials: forgotPassProps) => Promise<void>;
    resetPass: (credentials: resetPassProps) => Promise<void>;
}

type UserProps = {
    id: string;
    nome: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    nome: string;
    email: string;
    genero: string;
    dataNasc: string;
    cpf: string;
    senha: string; // 'password' alterado para 'senha'
    tipoLogin: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    telefonePessoal: string;
    telefoneTrabalho?: string;
}

type forgotPassProps = {
    email: string;
}

type resetPassProps = {
    password: string;
    token: string | string[];
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        console.log('Erro ao deslogar.');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { id, nome, email } = response.data;

                setUser({
                    id,
                    nome,
                    email
                });
            }).catch(() => {
                signOut();
            });
        }
    }, []);

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, nome, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
                path: "/"  // Quais caminhos terão acesso ao cookie
            });

            setUser({
                id,
                nome,
                email,
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Login realizado com sucesso!');
            Router.push('/dashboard');

        } catch (err) {
            toast.error('Erro ao tentar acessar.');
            console.log('Erro ao acessar', err);
        }
    }

    async function signUp(credentials: SignUpProps) {
        try {
            const response = await api.post('/users', {
                nome: credentials.nome,
                email: credentials.email,
                genero: credentials.genero,
                dataNasc: credentials.dataNasc,
                cpf: credentials.cpf,
                senha: credentials.senha,
                tipoLogin: credentials.tipoLogin,
                cep: credentials.cep,
                logradouro: credentials.logradouro,
                numero: credentials.numero,
                complemento: credentials.complemento,
                bairro: credentials.bairro,
                cidade: credentials.cidade,
                uf: credentials.uf,
                telefonePessoal: credentials.telefonePessoal,
                telefoneTrabalho: credentials.telefoneTrabalho
            });

            console.log("retorno do response do post no banco ", response)
            
            toast.success('Conta criada com sucesso!');
            Router.push('/');

        } catch (err) {
            toast.error('Erro ao tentar realizar o cadastro.');
            console.log('Erro ao cadastrar', err);
        }
    }

    async function forgotPass({ email }: forgotPassProps) {
        try {
            const response = await api.post('/forgotPassword', { email });

            toast.success('Email enviado para redefinição da senha!');
            Router.push('/');

        } catch (err) {
            toast.error('Erro ao tentar realizar redefinição da senha.');
            console.log('Erro ao tentar redefinir senha.', err);
        }
    }

    async function resetPass({ password, token }: resetPassProps) {
        try {
            const response = await api.post(`/resetPassword/${token}`, { password });

            toast.success('Senha redefinida com sucesso!');
            Router.push('/');

        } catch (err) {
            toast.error('Erro ao tentar realizar redefinição da senha.');
            console.log('Erro ao tentar redefinir senha.', err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, forgotPass, resetPass }}>
            {children}
        </AuthContext.Provider>
    );
}
