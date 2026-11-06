
Vagrant.configure("2") do |config|

  # Imagem base das duas máquinas virtuais
  config.vm.box = "ubuntu/jammy64"

  # VM1 - Máquina de testes
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "maquina-testes"

    vm1.vm.network "private_network", ip: "192.168.56.10"

    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "Sistema-Academico-VM1"
      vb.memory = 1024
    end

    # Instalação do curl para testar a API
    vm1.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y curl
    SHELL
  end

  # VM2 - Servidor da API
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "servidor-api"

    vm2.vm.network "private_network", ip: "192.168.56.11"

    # Pasta compartilhada com o projeto
    vm2.vm.synced_folder ".", "/vagrant_data"

    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "Sistema-Academico-VM2"
      vb.memory = 2048
    end

    # Instalação das dependências e execução da API
    vm2.vm.provision "shell", inline: <<-SHELL
        apt-get update
        apt-get install -y curl ca-certificates rsync

        curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
        apt-get install -y nodejs

        mkdir -p /opt/sistema-academico
        rsync -a --delete --exclude=node_modules --exclude=.git /vagrant_data/ /opt/sistema-academico/

        cd /opt/sistema-academico
        npm ci

        nohup npm start > /var/log/sistema-academico.log 2>&1 &
        SHELL
  end

end
