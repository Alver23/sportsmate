@if ($method === 'ajax')
	<div class="alert alert-{{ (!empty($typeAlert) ? $typeAlert : '') }} alert-dismissible {{ (!empty($class) ? $class : '') }}" id="{{ (!empty($id) ? $id : '') }}">
	</div>
@elseif (count($errors) > 0)
	<div class="alert alert-{{ (!empty($typeAlert) ? $typeAlert : '') }} alert-dismissible {{ (!empty($class) ? $class : '') }}" id="{{ (!empty($id) ? $id : '') }}">
		<ul>
			@foreach ($errors->all() as $error)
				<li>{{ $error }}</li>
			@endforeach
		</ul>
	</div>
@endif