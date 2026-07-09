<?php

namespace Artifact\Core;

class Portal
{
	private string $model;

	private string $method;

	private string $controllerClassName;

	private string $action;

	public function __construct(string $urlModel, string $method, string $controlleFilename, string $controlleClassName, string $action)
	{
		$this->model = $urlModel;
		$this->method = strtolower($method);
		$this->action = $action;
		$this->controllerClassName = $controlleClassName;

		$exec = new ($this->controllerClassName)();
	}

	public function getModelURL(): string
	{
		return $this->model;
	}

	public function getMethod(): string
	{
		return $this->method;
	}

	public function executeFunction(array $args)
	{
		$act = $this->action;
		$exec = new ($this->controllerClassName)();

		if(empty($args))
		{
			return $exec->$act();		
		}
		
		return $exec->$act(...$args);
	}
}