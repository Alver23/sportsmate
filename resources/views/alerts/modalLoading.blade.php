@if (!empty($image))
	<div class="modalLoading">
		<div class="modalLoading-image">
			<img src="{{ asset($image) }}" alt="Loading">
			@if (!empty($message))
				<h3 class="text-black"><strong>{{ $message }}</strong></h3>
			@endif
		</div>
	</div>
@endif