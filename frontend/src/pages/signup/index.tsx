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

  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('Masculino');
  const [dataNasc, setDataNasc] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoLogin, setTipoLogin] = useState('Cliente');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [telefonePessoal, setTelefonePessoal] = useState('');
  const [telefoneTrabalho, setTelefoneTrabalho] = useState('');

  // Função para buscar endereço via API do ViaCEP
  async function buscarEnderecoPorCep(cep: string) {
    if (cep.length !== 8) {
      toast.error("O CEP deve ter 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP inválido. Tente novamente.");
        return;
      }

      // Preencher os campos com os dados retornados
      setLogradouro(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setUf(data.uf);
    } catch (error) {
      toast.error("Erro ao buscar o CEP. Tente novamente.");
    }
  }

  // Função para lidar com o evento de cadastro
  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (!nome || !email || !cpf || !senha || !genero || !dataNasc || !tipoLogin || !cep || !logradouro || !numero || !bairro || !cidade || !uf || !telefonePessoal || !telefoneTrabalho) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    setLoading(true);

    let data = {
      nome,
      email,
      genero,
      dataNasc,
      cpf,
      senha,
      tipoLogin,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      telefones: [
        { numero: telefonePessoal, tipo: 'Pessoal' },
        { numero: telefoneTrabalho, tipo: 'Trabalho' }
      ]
    };

    await signUp(data);
    setLoading(false);
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/" legacyBehavior>
          <a className={styles.voltarHome}>🠔 Voltar para home</a>
        </Link>
        <div>
          <Image src={logoImg} alt="Logo Pizzaria" />
        </div>
      </header>

      <h1 className={styles.loginTitle}>Acessar minha conta</h1>

      <div className={styles.containerCenter}>
        <div className={styles.login}>
          <form onSubmit={handleSignUp}>
            <div className={styles.gridForm}>
              <div>
                <label>Nome</label>
                <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div>
                <label>Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label>Gênero</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outros">Outros</option>
                </select>
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
                <select value={tipoLogin} onChange={(e) => setTipoLogin(e.target.value)}>
                  <option value="Cliente">Cliente</option>
                  <option value="Funcionario">Funcionario</option>
                </select>
              </div>
              <div>
                <label>CEP</label>
                <Input
                  type="text"
                  value={cep}
                  onChange={(e) => {
                    setCep(e.target.value);
                    if (e.target.value.length === 8) {
                      buscarEnderecoPorCep(e.target.value); // Buscar quando o CEP tiver 8 dígitos
                    }
                  }}
                />
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
              {/* <div>
                <label>Telefone Trabalho</label>
                <Input type="text" value={telefoneTrabalho} onChange={(e) => setTelefoneTrabalho(e.target.value)} />
              </div> */}
            </div>

            <Button type="submit" loading={loading}>Cadastrar</Button>

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