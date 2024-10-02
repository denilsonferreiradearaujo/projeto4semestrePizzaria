import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logoImg from '../../../public/logo.svg';

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import styles from '../../../src/pages/signup/styles.module.scss';
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoLogin, setTipoLogin] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefonePessoal, setTelefonePessoal] = useState('');
  const [telefoneTrabalho, setTelefoneTrabalho] = useState('');

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (!name || !email || !cpf || !senha) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/" legacyBehavior>
          <a className={styles.voltarHome}>🠔 Voltar para home</a>
        </Link>
        <div>
          <Image src={logoImg} alt="Logo Pizzaria " />
        </div>
      </header>

      <h1 className={styles.loginTitle}>Acessar minha conta</h1>

      <div className={styles.containerCenter}>


        <div className={styles.login}>

          <form onSubmit={handleSignUp}>
            <div className={styles.gridForm}>
              <div>
                <label>Nome</label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label>Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label>Gênero</label>
                <Input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} />
              </div>
              <div>
                <label>Data de Nascimento</label>
                <Input type="date" value={dataNasc} onChange={(e) => setDataNasc(e.target.value)} />
              </div>
              <div>
                <label>CPF</label>
                <Input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </div>
              <div>
                <label>Senha</label>
                <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
              </div>
              <div>
                <label>Tipo Login</label>
                <Input type="text" value={tipoLogin} onChange={(e) => setTipoLogin(e.target.value)} />
              </div>
              <div>
                <label>CEP</label>
                <Input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
              </div>
              <div>
                <label>Logradouro</label>
                <Input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
              </div>
              <div>
                <label>Número</label>
                <Input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
              </div>
              <div>
                <label>Complemento</label>
                <Input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
              </div>
              <div>
                <label>Bairro</label>
                <Input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
              </div>
              <div>
                <label>Cidade</label>
                <Input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
              </div>
              <div>
                <label>UF</label>
                <Input type="text" value={uf} onChange={(e) => setUf(e.target.value)} />
              </div>
              <div>
                <label>Telefone Pessoal</label>
                <Input type="text" value={telefonePessoal} onChange={(e) => setTelefonePessoal(e.target.value)} />
              </div>
              <div>
                <label>Telefone Trabalho</label>
                <Input type="text" value={telefoneTrabalho} onChange={(e) => setTelefoneTrabalho(e.target.value)} />
              </div>
            </div>

            <Button type="submit" loading={false}>Cadastrar</Button>

            <Link legacyBehavior href="/">
              <div className={styles.btnCadastrar}>
                <a className={styles.text}>Já possui uma conta? Faça o login</a>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}