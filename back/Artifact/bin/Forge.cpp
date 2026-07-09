#include <iostream>
#include <string>
#include <vector>
#include <functional>
#include <algorithm>
#include <cctype>
#include <fstream>

namespace Tools {
	namespace Colors {
		const std::string RESET     = "\033[0m\033[K";
		const std::string BOLD      = "\033[1m";
		const std::string T_BLACK   = "\033[30m";
		const std::string T_RED     = "\033[31m";
		const std::string T_GREEN   = "\033[32m";
		const std::string T_YELLOW  = "\033[33m";
		const std::string T_BLUE    = "\033[34m";
		const std::string T_MAGNETA = "\033[35m";
		const std::string T_CYAN    = "\033[36m";
		const std::string T_GREY    = "\033[37m";
		const std::string B_BLACK   = "\033[40m";
		const std::string B_RED     = "\033[41m";
		const std::string B_GREEN   = "\033[42m";
		const std::string B_YELLOW  = "\033[43m";
		const std::string B_BLUE    = "\033[44m";
		const std::string B_MAGNETA = "\033[45m";
		const std::string B_CYAN    = "\033[46m";
		const std::string B_GREY    = "\033[47m";
	};

	void ltrim(std::string &s) {
		s.erase(s.begin(), std::find_if(s.begin(), s.end(), [](unsigned char ch) {
			return !std::isspace(ch);
		}));
	}

	void rtrim(std::string &s) {
		s.erase(std::find_if(s.rbegin(), s.rend(), [](unsigned char ch) {
			return !std::isspace(ch);
		}).base(), s.end());
	}

	void trim(std::string &s) {
		Tools::rtrim(s);
		Tools::ltrim(s);
	}

	std::string capitalize(std::string s) {
		if(s.empty()) return s;

		s[0] = static_cast<char>(std::toupper(static_cast<unsigned char>(s[0])));

		std::transform(s.begin() + 1, s.end(), s.begin() + 1, [](unsigned char c) {
			return std::tolower(c);
		});
		return s;
	}
};

namespace Artifact {
	class CommandConstruction
	{
		public:
		CommandConstruction(std::string commandName, std::vector<std::string> params, std::function<void(std::vector<std::string>)> action) {
			this->commandName = commandName;
			this->action = action;
			this->params = params;
		}


		std::string getCommandName() {
			return this->commandName;
		}

		void exec() {
			this->action(this->params);
		}

		private:
			std::string commandName;
			std::function<void(std::vector<std::string>)> action;
			std::vector<std::string> params;
	};

	void cerr(std::string error) {
		std::cout << Tools::Colors::B_RED << Tools::Colors::BOLD << "Artifact Forge Error :" << Tools::Colors::RESET << Tools::Colors::T_RED << Tools::Colors::BOLD << " " << error << Tools::Colors::B_BLACK << Tools::Colors::RESET << std::endl;
	}

	void process(std::string proc, bool endl) {

		if(endl) {
			std::cout << Tools::Colors::T_YELLOW << proc << Tools::Colors::RESET << std::endl;
		} else {
			std::cout << Tools::Colors::T_YELLOW << proc << Tools::Colors::RESET;
		}
	}

	void warn(std::string s) {
		std::cout << Tools::Colors::BOLD << Tools::Colors::T_YELLOW << s << Tools::Colors::RESET << std::endl;
	}

	std::string cin(std::string label) {
		std::string text;
		std::cout << Tools::Colors::T_BLACK << Tools::Colors::BOLD << label << Tools::Colors::RESET;
		std::cin >> text;
		return text;
	}
};

void create(std::vector<std::string> command) {
	if(command[2] == "Portal") {
		bool valid = true;
		std::string portalName;

		Artifact::process(" ༒  Create Artifact ", false);
		std::cout << Tools::Colors::BOLD << Tools::Colors::T_RED << "Portal " << Tools::Colors::RESET << "\n" << std::endl;
		
		while (true){
			portalName = Artifact::cin(" 𐂲 Portal name 𐡸 ");

			Tools::trim(portalName);
			portalName = Tools::capitalize(portalName);

			std::string portals = "../Portals/.portals";
			std::fstream portalFile(portals, std::ios::in | std::ios::out | std::ios::app);

			if(!portalFile.is_open()) {
				Artifact::cerr("`Portals.portals` : failed to open");
				break;
			}

			bool alreadyIn = false;
			bool confirm = false;
			std::string Ligne;

			while(std::getline(portalFile, Ligne)) {
				if(Ligne == portalName) {
					Artifact::warn(" `" + portalName + "` is already a portal, name another one.");
					alreadyIn = alreadyIn || true;
				}
			}

			if(alreadyIn) {
				valid = false;
			}
			else {
				std::string s = Artifact::cin(" 𐂲 Use `" + portalName + "` as a portal (Y/N) 𐡸 ");
				if(s == "Y" || s == "y") {
					confirm = true;
				} else {
					confirm = false;
				}
			}

			if(!confirm) {
				valid = false;
			} else {
				valid = true;
				portalFile.clear();
				portalFile << "\n" << portalName;

				std::string controller = "../App/Controller/" + portalName + "Controller.php";
				std::string portalJSON = "../Portals/" + portalName + ".portal";

				std::fstream controllerFile(controller, std::ios::in | std::ios::out | std::ios::app);
				std::fstream portalJSONFile(portalJSON, std::ios::in | std::ios::out | std::ios::app);

				if(!controllerFile.is_open() || !portalJSONFile.is_open()) {
					Artifact::cerr("While creating File");
				}

				//controllerFile << ;
				//portalJSONFile << ;			
			}

			if(valid) {
				break;
			}
		}

	} else {
		Artifact::cerr("`" + command[2] + "` is not recognized as a Command.");
	}
}

int main(int argc, char** argv)
{
	std::vector<std::string> args(argv, argv + argc);

	std::string InitialCommand{args[1]};
	std::vector<Artifact::CommandConstruction> command;

	Artifact::CommandConstruction c{"create", args, create};
	command.push_back( c );

	for(int i = 0; i < command.size(); i++) {
		if(args[1] == command[i].getCommandName()) {
			command[i].exec();
		}
	}
}