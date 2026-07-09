<?php

namespace Artifact\Core;

use Artifact\Core\Portal;

class Forge
{

	//contain the root project
	private string $rootPath;

	//file name
	private string $portalEndPoint;

	//portals
	private array $portals;

	//porals
	private array $portalForge;

	public function __construct()
	{
		$this->portalEndPoint = ".portals";
		$this->rootPath = dirname(__DIR__, 2);
		$this->portals = [];
		$this->portalForge = [];
	}
	
	public function run(): void
	{
		$this->openPortals();
		$this->loadPortal();

		$response = "404 Not Found";
		foreach($this->portalForge as $port) {
			$request = explode('?', $port->getModelURL());
			$data = $this->matchPortal($port->getModelURL(), $_SERVER['REQUEST_URI']);
	
			if(strtoupper($_SERVER['REQUEST_METHOD']) === strtoupper($port->getMethod())) {
				if($data !== false)
				{
					$response = $port->executeFunction($data);
					break;
				}
			}
		}
		echo $response;
	}

	/**
	 * Utility method
	 * */
	public function getProjectRootPath()
	{
		return $this->rootPath;
	}
 

 	//PORTAL LOADER
	/**
	 * list all portal in variable portals 
	 * */
	private function openPortals(): void
	{
		$path = $this->getProjectRootPath() . "/Portals/" . $this->portalEndPoint;
		
		if(!file_exists($path))
		{	
			die("Artifact error: \n" . $path . " is missing\n");
		}
		else
		{
			$lignes = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

			foreach ($lignes as $value) {
				$this->portals[] = $value;
			}
		}
	}

	/**
	 * test if an url match the portal
	 * */
	private function matchPortal(string $model, string $trueUrl)
	{
		preg_match_all('#{([a-zA-Z0-9_]+)}#', $model, $paramNames);
		$params = $paramNames[1];

		$regex = preg_quote($model, '#');
		$regex = preg_replace('#\\\{[a-zA-Z0-9_]+\\\}#', '([^/]+)', $regex);
		$regex = '#^' . $regex . '$#';

		if(preg_match($regex, $trueUrl, $value))
		{
			array_shift($value);
			return $value;
		}
		return false;
	}

	/**
	 *
	 * */

	private function loadPortal()
	{
		$portalsPath = $this->getProjectRootPath() . '/Portals/';
		$controllerPath = $this->getProjectRootPath() . '/App/Controller/';

		foreach ($this->portals as $portal) {


			$filename = $portalsPath . $portal . '.portal';
			$controllername = $controllerPath . $portal . 'Controller.php'; 
			$data = [];

			if(file_exists($filename))
			{
				$content = file_get_contents($filename);
				$data = json_decode($content, true);

				if(json_last_error() !== JSON_ERROR_NONE)
				{
					die("Artifact Error : while parsing " . $filename) . "\n";
				}
			}
			else
			{
				echo $filename . " doesn't exists. Make it exist first\n";
			}

			if(file_exists($controllername))
			{
				require_once $controllername;

				$controllerClass = $portal . "Controller";
				$controller = NULL;

				if(class_exists($controllerClass))
				{
					$controller = new $controllerClass();
				}
				else
				{
					die("No controller match");
				}

				foreach ($data["portal"] as $subPortal) {
					if(method_exists($controller, $subPortal["action"]) && (strtolower($subPortal["method"]) == "get" || strtolower($subPortal["method"]) == "post"))
					{
						$action = $subPortal["action"];

						$this->portalForge[] = new Portal("/" . $data["root"] . $subPortal["url"], $subPortal["method"], $controllername, $controllerClass, $action);
					}
					else 
					{
						echo("No method match for \"" . $subPortal["action"] . "\" in class \"" . $controllerClass . "\"\n");
					}
				}
			}
			else
			{
				echo $controllername . "doesn't exists. \n";
			}
		}
	}
}