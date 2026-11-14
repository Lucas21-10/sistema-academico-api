Vagrant.configure("2") do |config|

  # Imagem base das duas máquinas virtuais
  config.vm.box = "ubuntu/jammy64"

  # VM1 - Nó de controle (Ansible)
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "no-controle"

    vm1.vm.network "private_network", ip: "192.168.56.10"

    # Monta os arquivos de configuração do Ansible dentro de VM1
    vm1.vm.synced_folder ".", "/vagrant_data"

    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "Sistema-Academico-VM1"
      vb.memory = 1024
    end

    # Instalação do Ansible e ferramentas de teste na VM1
    vm1.vm.provision "shell", inline: <<-SHELL
      export DEBIAN_FRONTEND=noninteractive
      apt-get update
      apt-get install -y ansible sshpass curl wget git

      sed -i 's/\r$//' /vagrant_data/ansible.cfg /vagrant_data/hosts /vagrant_data/configura-node.yaml 2>/dev/null || true

      mkdir -p /etc/ansible
      cp /vagrant_data/ansible.cfg /etc/ansible/ansible.cfg
      cp /vagrant_data/hosts /etc/ansible/hosts

      ln -sf /vagrant_data/ansible.cfg /home/vagrant/ansible.cfg
      ln -sf /vagrant_data/hosts /home/vagrant/hosts
      ln -sf /vagrant_data/configura-node.yaml /home/vagrant/configura-node.yaml
      chown -h vagrant:vagrant /home/vagrant/ansible.cfg /home/vagrant/hosts /home/vagrant/configura-node.yaml
    SHELL
  end

  # VM2 - Servidor da API (Nó gerenciado)
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "servidor-api"

    vm2.vm.network "private_network", ip: "192.168.56.11"

    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "Sistema-Academico-VM2"
      vb.memory = 2048
    end

    # Habilita autenticação SSH para permitir que o Ansible na VM1 configure a VM2
    vm2.vm.provision "shell", inline: <<-SHELL
      echo "vagrant:vagrant" | chpasswd
      sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
      if [ -d /etc/ssh/sshd_config.d ]; then
        sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config.d/*.conf 2>/dev/null || true
      fi
      systemctl restart ssh
    SHELL
  end

end
