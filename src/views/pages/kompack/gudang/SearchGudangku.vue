<template>
  <div>
    <b-overlay
      :show="show"
      rounded="sm"
    >
      <b-card
        title="Cari Gudang"
        :poppins-hidden="show ? 'true' : null"
        text-color:bold
      >
        <b-card-text>Temukan mitra gudangmu</b-card-text>
        <div class="row mb-1 justify-content-end align-items-center">
          <div class="d-flex col-md-5">
            <input
              id="search"
              type="search"
              placeholder="Cari nama gudang atau pemilik"
              class="form-search mr-2 form-control"
            >
            <button
              id="buttonFilter"
              type="button"
              class="btn rounded-lg btn-primary btn-sm"
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE8SURBVHgB5VbtjcIwDHVP/D82uNwG3ARwG7ABbAAb0A0QE5QV2KAjdAPKBJQJwnvUSFUEIiGlIHjSU1TXH43txBX5WFhr+2AGmgAbozZ9CYUaE9MAm6na/FzT+ZKO0XMFmo4RaFQ0hKzCWiRJUkqb0DRu7WVQPrhhH5zSudQ7+wd/G/wDufNUIuGmlE5LpC53FfHVGyxDiUTnTRMdUM/rEtzjMVNxyWdw4er3JB50ytqvwKohN2CKoDuUaN1mwBGYw+ncfYFgrDm5PsvaqOGp0XyVX7ppeJgriYRbwxyc8MbHumvIv6Wu1UraDMhu0nE0k7o2Z1QaLJVHwXc86R2b+b57/ni6AwU4xk4uHXzy4OUlIKWDGyPNNPWjd4hGK+CU44yzcgxOpL7q2OW8gfyOkn2Xf5qrsF3/Jr4NjiViEkcjFAFDAAAAAElFTkSuQmCC">
            </button>
          </div>
        </div>
        <template>
          <b-card
            img-src="/assets/images/logo/komship-bw.png"
            img-alt=""
            img-left
            border-variant="light"
          >
            <b-card-text>
              <h3>Gudang Jaya</h3>
            </b-card-text>
            <b-card-text>
              12/3/2022
            </b-card-text>
          </b-card>
        </template>
        <template>
          <b-card
            img-src="/assets/images/logo/komship-bw.png"
            img-alt=""
            img-left
            border-variant="light"
          >
            <b-card-text>
              <h3>Gudang Jaya</h3>
            </b-card-text>
            <b-card-text>
              12/3/2022
            </b-card-text>
          </b-card>
        </template>
        <template>
          <b-card
            img-src="/assets/images/logo/komship-bw.png"
            img-alt=""
            img-left
            border-variant="light"
          >
            <b-card-text>
              <h3>Gudang Jaya</h3>
            </b-card-text>
            <b-card-text>
              12/3/2022
            </b-card-text>
          </b-card>
        </template>
        <template>
          <b-card
            img-src="/assets/images/logo/komship-bw.png"
            img-alt=""
            img-left
            border-variant="light"
          >
            <b-card-text>
              <h3>Gudang Jaya</h3>
            </b-card-text>
            <b-card-text>
              12/3/2022
            </b-card-text>
          </b-card>
        </template>
        <template>
          <b-card
            img-src="/assets/images/logo/komship-bw.png"
            img-alt=""
            img-left
            border-variant="light"
          >
            <b-card-text>
              <h3>Gudang Jaya</h3>
            </b-card-text>
            <b-card-text>
              12/3/2022
            </b-card-text>
          </b-card>
        </template>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
}
</script>
