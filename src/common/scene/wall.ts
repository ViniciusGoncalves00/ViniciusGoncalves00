import * as THREE from 'three';

export class Wall {
    public readonly mesh: THREE.Mesh;
    public readonly normal: THREE.Vector3;

    public constructor(width: number, height: number, normal: THREE.Vector3, position: THREE.Vector3, color: THREE.Vector3) {
        this.normal = normal;

        const geometry = new THREE.BoxGeometry(width, height, 0.15);
        const material = new THREE.MeshPhongMaterial({ color: new THREE.Color().setFromVector3(color)});
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.mesh.lookAt(normal);
        this.mesh.position.copy(position);
    }
}